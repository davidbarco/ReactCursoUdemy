import React, {Component} from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";

class Home extends Component{
    render(){
        
        return(
           <div id="home">
             <Slider  //etiqueta del slider.
                 title="Bienvenido al master en frameworks para Javascript"
                 btn="ir al blog"
                 size="slider-big"
             ></Slider>

           <div className="center">
                <div id="content">
                        <h1 className="subheader">Últimos Artículos</h1>
                        <Articles
                           home="true"
                        ></Articles>
                </div>
                <Sidebar></Sidebar>
           </div>

           </div>
        );
    }
}

export default Home;
