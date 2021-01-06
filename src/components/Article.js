import React, {Component} from "react";

import {Link, Redirect} from "react-router-dom";

import axios from "axios";
import Global from "../Global";
import Sidebar from "./Sidebar";

//sweetalert para las alertas bonitas.
import swal from "sweetalert";

//moment sirve para las fechas.
import Moment from "react-moment";
//importamos el lenguaje de moment en español
import "moment/locale/es";

//importo el archivo de assets, images. para poder utilizar mi imagen guardada en el caso de que no exista desde el api una imagen.
import imagenDefault from "../assets/images/imagenDefault.jpg"


class Article extends Component{

    //para pintar los datos de cada articulo y que sean los reales.
    url = Global.url;

    state={
        article: false,
        status: null
    };

    //componente del ciclo de vida, para cargar la informacion cuando carga el componente article.
    componentDidMount(){
        this.getArticle();
    }
    //metodo para sacar el articulo de la base de datos.
    getArticle=()=>{
        var id = this.props.match.params.id
        axios.get(this.url + "article/"+ id )
        .then(res =>{
            this.setState({
                article: res.data.article,
                status: "satisfactorio"
            })
        }).catch(err =>{
            this.setState({
                article: false,
                status: "satisfactorio"
                
            });
        });
    }
    //fin de pintar los datos de cada articulo y que sean los reales


    //metodo para borrar un articulo
    deleteArticle=(id)=>{
      axios.delete(this.url+"article/"+id)
      .then(res=>{
        this.setState({
            article: res.data.article,
            status: "deleted"
        })
        swal(
            "articulo Borrado",
            "el articulo ha sido borrado correctamente",
            "success"
        )
      })

    }



    render(){

        //para que cuando se borre el articulo me haga la redireccion.
        if(this.state.status === "deleted"){
            return <Redirect to="/blog"></Redirect>
        }

        var article = this.state.article;
        
        return(
            <div className="center">
            <section id="content">
                
                {this.state.article &&
                    <article className="article-item article-detail">
                        <div className="image-wrap">
                           {/* condicion para cuando no exista una imagen */}
                        {article.image !== null ? (
                            /* pongo la url del metodo que me saca la imagen */
                            <img src={this.url + "get-image/" + article.image}
                                alt={article.title} />

                        ) : (
                             /* pongo la url del metodo que me saca la imagen */
                             <img src={imagenDefault}
                             alt={article.title}/>

                        )

                        }
                        </div>
                        <h1 className="subheader">{article.title}</h1>
                        <span className="date">
                            {/* con fromNow en momento me pinta la fecha estilo facebook. (ejemplo: hace tantos dias.) */}
                      <Moment locale="es" fromNow>{article.date}</Moment>  
                        </span>
                       <p>
                           {article.content}
                       </p>

                       {/* botones de editar y eliminar articulo. */}
                       <div className="botones">

                       {/* metodo para borrar un articulo */}
                       <button onClick={
                         ()=>{
                             //nombre del metodo.
                             this.deleteArticle(article._id)
                         }

                       }className="btn btn-danger">Eliminar</button>
                       <Link to={"/blog/editar/"+ article._id} className="btn btn-warning">editar</Link>
                       </div>
                     
                        <div className="clearfix"></div>
                    </article>
    


                }
                
                {/* condicion cuando no hayan articulos */}
                {!this.state.article && this.state.status === "satisfactorio" &&
                 <div id="article">
                     <h2 className="subheader">El articulo no existe</h2>
                     <p>Intentalo de nuevo mas tarde</p>
                 </div>
                }

                {/* cargando... */}
                {this.state.status == null &&
                 <div id="article">
                     <h2 className="subheader">Cargando...</h2>
                     <p>espere unos segundos</p>
                 </div>
                }


            </section>
            <Sidebar></Sidebar>
            </div>

        );
    }
}

export default Article;
