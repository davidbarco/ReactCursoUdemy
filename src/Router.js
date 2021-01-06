import React, {Component} from "react";


import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//importo el componente que quiero cargar con la ruta. ej: /ruta-prueba

import MiComponente from "./components/MiComponente";

import Error from "./components/Error";
import Header from "./components/header";

import Formulario from "./components/Formulario";
import Peliculas from "./components/peliculas";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Search from "./components/Search";
import Article from "./components/Article";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";



class Router extends Component{
   
    render(){
        
        return(
            <BrowserRouter>
            {/* cargo la etiqueta Header, que es mi componenete */}
            <Header></Header>

          

            {/* /* configurar rutas y paginas */ }
           <Switch>
           <Route exact path="/" component={Home}></Route>
           <Route exact path="/home" component={Home}></Route>
           <Route exact path="/blog" component={Blog}></Route>
           <Route exact path="/blog/busqueda/:search" component={Search}></Route>

           <Route exact path="/redirect/:search" render={
              (props) =>{
                  var search= props.match.params.search;
                  //con la propiedad redirect, que he colocado en el import de la linea 4 de arriba.
                  return( <Redirect to={"/blog/busqueda/" + search}></Redirect>);
              }

           }></Route>

           {/* componente de cada articulo cuando le de click, me lleve a la pagina de solo ese articulo mediante el id */}
           <Route exact path="/blog/articulo/:id" component={Article}></Route>

           {/* componente de edicion de cada articulo.  */}
           <Route exact path="/blog/editar/:id" component={EditArticle}></Route>

            {/* pagina para crear articulo */}
            <Route exact path="/blog/crear" component={CreateArticle}></Route>

           <Route exact path="/formulario" component={Formulario}></Route>
           <Route exact path="/peliculas" component={Peliculas}></Route>

           <Route exact path="/segunda-ruta" component={MiComponente}></Route>
           

           <Route exact path="/pruebas/:id" render={(props)=>{
               //para sacar el segundo parametro que me llega por la url
               var id= props.match.params.id;
               
              
              return (
                    <div id="content">
                    <h1 className="subheader">Página de pruebas</h1>
                    <h2>{id}</h2>
                    </div>
               )
           }
        }>


           </Route>


           {/*ruta de error o ruta no encontrada  */}
           <Route component={Error}></Route>
           </Switch>

           
      <div className="clearfix"></div>

      
      <Footer></Footer>
           </BrowserRouter>
        )
    }
}
export default Router;