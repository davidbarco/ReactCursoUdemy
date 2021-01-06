import React,{Component} from "react";

//para preparar los enlaces y que me funcionen
import {Link} from "react-router-dom";

//para utilizar axios despues hacerle el npm install --save axios.
import axios from "axios";
import Global from "../Global";

//hacemos npm install --save react-moment para instalar el paquete
//tambien debemos instalar el paquete de moment. npm install --save moment react-moment
import Moment from "react-moment";
//importamos el lenguaje de moment en español
import "moment/locale/es";

//importo el archivo de assets, images. para poder utilizar mi imagen guardada en el caso de que no exista desde el api una imagen.
import imagenDefault from "../assets/images/imagenDefault.jpg"

class Articles extends Component{

    url = Global.url
    

    state={
        articles: [],
        status: null
    }

    //el metodo getArticles lo cargo en un componente del ciclo de vida, es decir, para que lo carge antes de iniciar la pagina.
    componentDidMount(){
        var home = this.props.home;
        var search = this.props.search;
        if(home === "true"){
          this.getLastArticles();
          
        }else if(search && search !== null && search !== undefined){
             this.getArticlesBySearch(search);
        }else{
            //para llamar al metodo es asi:
            this.getArticles();
        }

    }

    //metodo para Buscar articulos
    getArticlesBySearch = (searched)=>{
        //hago la peticion ajax.
        axios.get(this.url + "search/" + searched)
        .then(res => {
            
                this.setState({
                    articles: res.data.articles,
                    status: "satisfactorio"
                    
                });
        })
        .catch(err =>{
            this.setState({
                articles: [],
                status: "satisfactorio"
                
            });
        });
        
    }



        //metodo para sacar todos los ultimos articulos
        getLastArticles = ()=>{
            //hago la peticion ajax.
            axios.get(this.url + "articles/last")
            .then(res => {
                
                this.setState({
                    articles: res.data.articles,
                    status: "satisfactorio"
                    
                });
                
                
            })
            
        }




    //metodo para sacar todos los articulos del api rest con nodejs
    getArticles = ()=>{
        //hago la peticion ajax.
        axios.get(this.url + "articles")
        .then(res => {
            
            this.setState({
                articles: res.data.articles,
                status: "satisfactorio"
                
            });
            /* console.log(this.state); */
            
        })
        
    }


    render(){

        if(this.state.articles.length >= 1){

            //me creo una variable y luego con el map recorro mi lista de articles.
            var listArticles = this.state.articles.map((article)=>{
                return(
                    <article key={article._id} className="article-item" id="article-template">
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
                    <h2>{article.title}</h2>
                    <span className="date">
                        {/* con fromNow en momento me pinta la fecha estilo facebook. (ejemplo: hace tantos dias.) */}
                      <Moment locale="es" fromNow>{article.date}</Moment>  
                    </span>
                    <Link to={"/blog/articulo/" + article._id}>Leer Más</Link>
                    <div className="clearfix"></div>
                </article>
                );
            })

            return(
              <div id="articles">
                  {/* listado de articulos desde la variable creada en la linea 41 */}
                {listArticles}

              </div>
            );
        }else if(this.state.articles.length === 0 && this.state.status === "satisfactorio"){
            return(
                <div id="articles">
                  <h2 className="subheader">No hay articulos para mostrar</h2>
                  <p>todavia no hay contenido en esta seccion</p>
                </div>
              );
        }else{
            return(
                <div id="articles">
                  <h2 className="subheader">cargando...</h2>
                  <p>espere mientras carga el contenido</p>
                </div>
              );
        }
    }
}
export default Articles;