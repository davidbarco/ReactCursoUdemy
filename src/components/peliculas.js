import React, { Component } from "react";
import Pelicula from "./Pelicula";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

class Peliculas extends Component {

    //utilizo el state, porque son datos que quiero mostrar en mis vistas
    state ={
      peliculas: [
          {titulo: "batman vs superman", image: "https://wallpapercave.com/wp/wp2869152.jpg" },
          {titulo: "los simpsons", image: "https://depor.com/resizer/RiU3nYQqC6iyOU2O_pMmCO6UlzA=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/373KKO7XL5D37KCDKU2J5JOCQA.jpg" },
          {titulo: "los caballeros del zodiaco", image: "https://www.prensalibre.com/wp-content/uploads/2018/12/95f93658-02cc-4c2f-abb0-7a25c0384c2b.jpg?quality=82&w=760&h=430&crop=1" },
      
        ],
        nombre: "David Barco",
        favorita: {},
    };

    //metodo para cambiar titulo.
    CambiarTitulo= ()=>{
       var {peliculas}= this.state;
       peliculas[0].titulo = "Batman ganador";

       this.setState({
           peliculas: peliculas
       });
    }

    favorita = (pelicula, indice)=>{
        console.log("favorita marcada")
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        })
    }






    render() {
        var pStyle={
           background: 'green',
           color: 'white',
           padding: '10px'
        };
        return (
            <React.Fragment>
            <Slider  //etiqueta del slider.
            title="Peliculas"
            size="slider-small"
           
        ></Slider>

            <div className="center">
            <div id="content" className="peliculas">
                <h2 className="subheader">listado de peliculas</h2>
                <p>seleccion de peliculas favoritas de : {this.state.nombre}</p>
                <p><button onClick={this.CambiarTitulo}>cambiar titulo</button></p>
               
               {/* condicional */}

               {this.state.favorita.titulo ? (
               <p className="favorita" style={pStyle}>
                   <strong>La pelicula favorita es: </strong>
                   <span>{this.state.favorita.titulo}</span>
               </p>
               ) : (
                   <p>no hay peliculas favoritas</p>
               )
               
               }
               {/*crear componente de peliculas  */}


                <div id="articles" className="peliculas">

                    {/* bucle hecho con .map */}
               {
                   this.state.peliculas.map((pelicula,i)=>{
                       return(
                          <Pelicula
                           key={i} 
                           pelicula={pelicula}
                           indice={i}
                           marcarFavorita={this.favorita}  
                          ></Pelicula>
                       )
                   })
               }
               </div>

            </div>
            <Sidebar
                  //props.
                  blog="false"
                  

                ></Sidebar>
            </div>
            </React.Fragment>
        );
    }
}

export default Peliculas;