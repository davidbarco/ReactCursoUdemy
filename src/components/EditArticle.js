import React,{Component} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import Sidebar from "./Sidebar";

//sweetalert para las alertas bonitas.
import swal from "sweetalert";

//libreria para validar formulario, primero lo instalo  con npm install --save simple-react-validator
import SimpleReactValidator from "simple-react-validator";

import imagenDefault from "../assets/images/imagenDefault.jpg"

// 1) tenemos que recoger el id del articulo que vamos a editar de la url.
// 2) tenemos que crear un metodo para sacar ese objeto del api del backend.
// 3) tenemos que rellenar el formulario con esos datos.
// 4)  tenemos que actualizar el objeto, haciendo peticion al backend.



class EditArticle extends Component{
    url = Global.url;

    //solucion 1) tenemos que recoger el id del articulo que vamos a editar de la url.
    articleId= null;

    //creamos el ref de cada uno, pero no es necesario el ref del campo de tipo : file
    //con estos recogemos la informacion que se ponen en cada input del formulario
    titleRef = React.createRef();
    contentRef = React.createRef();

    state ={
        article:{},
        status: null,
        selectedFile: null
    };

    //componente del ciclo de vida. para que carge el import del validator de la linea 8.
    componentWillMount(){
        //propiedad para editar, donde está el id del articulo
        this.articleId= this.props.match.params.id;

        //el metodo getArticles para editar lo llamo aqui.
        this.getArticle(this.articleId);
        
        this.validator = new SimpleReactValidator({
            messages: {
              required: 'este campo es obligatorio.',
              
            },
          });
    }

    //metodo getArticle para editar
    getArticle=(id)=>{
        axios.get(this.url+"article/"+id)
        .then(res=>{
            this.setState({
                article: res.data.article
            })
        })
    }

    //crear un metodo para guardar en el state los datos que recogo del formulario
    changeState =()=>{
        this.setState({
            article:{
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        })
        /* console.log(this.state); */
    }
    

    //metodo saveArticle del formulario, para editar lo modificamos.
    saveArticle= (e)=>{
        e.preventDefault();

        //rellenar state con formulario
        this.changeState();

        //condicion para saber si el campo es valido, con validator
        if(this.validator.allValid()){
            //hacer peticion http por put, para editar el articulo, como segundo parametro le paso los datos del articulo que voy a guardar
            axios.put(this.url + "article/" + this.articleId, this.state.article)
            .then(res =>{
                if(res.data.article){
    
                    this.setState({
                        article: res.data.article,
                        //para que no me rediriga hasta que no suba la imagen
                        status: "waiting"
                    });

                    swal(
                        "articulo editado",
                        "el articulo ha sido editado correctamente",
                        "success"
                    )
    
                    //subir la imagen
                    if(this.state.selectedFile !== null){
                       // 1) sacar el id del articulo guardado.
                       var articleId = this.state.article._id
                       
                       //2) crear un form data y añadir fichero.
                       const formData = new FormData();
                       formData.append(
                           "file0",
                           this.state.selectedFile,
                           this.state.selectedFile.name
                       )
    
                       //3) peticion ajax, y como segundo parametro le pasamos el form data, porque son los parametros que quiero guardar
                       axios.post(this.url + "upload-image/"+ articleId, formData)
                            .then(res=>{
                                if(res.data.article){
                                    this.setState({
                                        article: res.data.article,
                                        status: "satisfactorio"
                                    });
                                }else{
                                    this.setState({
                                        article: res.data.article,
                                        status: "failed"
                                    });
                                }
                            })
    
    
                        
    
                    }else{
                        this.setState({
                            status: "satisfactorio"
                        });
                    }
    
                }else{
    
                    this.setState({
                        status: "failed"
                    })
    
                }
            })

        }else{
            this.setState({
                status: "failed"
            })
           //si no está todo validado, muestro los mensajes:
           this.validator.showMessages();
           this.forceUpdate();
        }
    }

    //metodo para subir la imagen
    fileChange= (event)=>{
      this.setState({
          selectedFile: event.target.files[0]
      })
      console.log(this.state.selectedFile)
    }



    render(){

        console.log(this.state.article)
        
        /* hacer redireccion cuando el state sea satisfatorio, es decir, que se haya creado el articulo */
        if(this.state.status === "satisfactorio"){
            return <Redirect to="/blog"></Redirect>
        }


        return(
           <div className="center">
               <section id="content">
                 <h1 className="subheader">Editar Articulo</h1>


                                 {/* condicional para editar */}
                                 {this.state.article.title &&

                                 /* formulario */
                                 /* vincular nuestro formulario con la funcionalidad de react: con onsubmit */
                                 <form className="full-form" onSubmit={this.saveArticle}>

                                  <div className="form-group">
                                  <label htmlFor="title">Titulo</label>   {/* con la propiedad defaultValue relleno mi formulario */}
                                  <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef} onChange={this.changeState}></input>
                                  
                                  {/*validamos con 3 parametros:  el input con name= title, el this.state.article.title, y el required  */}
                                  {this.validator.message("title", this.state.article.title, "required")}

                                  </div>

                                  <div className="form-group">
                                  <label htmlFor="content">Contenido</label>
                                  <textarea name="content" defaultValue={this.state.article.content} ref={this.contentRef} onChange={this.changeState}></textarea>
                                   
                                   {/*validamos con 3 parametros:  el input con name= title, el this.state.article.title, y el required  */}
                                   {this.validator.message("content", this.state.article.content, "required")}

                                  </div>

                                  <div className="form-group">
                                  <label htmlFor="file0">imagen</label> <br></br>
                                  <div className="image-wrap">

                           {/* condicion para cuando no exista una imagen */}
                            {this.state.article.image !== null ? (
                                /* pongo la url del metodo que me saca la imagen */
                                <img  className="thumb" src={this.url + "get-image/" + this.state.article.image}
                                    alt={this.state.article.title} />

                            ) : (
                                /* pongo la url del metodo que me saca la imagen */
                                <img className="thumb" src={imagenDefault}
                                alt={this.state.article.title}/>

                            )

                        }
                        </div>
                                  <input type="file" name="file0" onChange={this.fileChange}></input>
                                  </div>
                                  <div className="clearfix"></div>
                                  <input type="submit" value="guardar" className="btn btn-success"></input>

                                 </form>

                                 }

                                 {!this.state.article.title &&
                                    <h2 className="subheader">Cargando...</h2>
                                 }



               </section>

               <Sidebar></Sidebar>

           </div>
        );
    }
}

export default EditArticle;
