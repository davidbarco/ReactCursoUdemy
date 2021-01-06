import React, { Component } from "react";

//importar componentes
import MiComponente from "./MiComponente";

class SeccionPruebas extends Component {

    contador = 0;

    /* constructor(props){
      super(props);
      this.state={
          contador: 0
      };
    } */

    state={
        contador: 0
    };
    

    HolaMundo(nombre, edad) {
        var presentacion =
          <div>
            <h2> hola, soy {nombre}</h2>
            <h3>tengo {edad}</h3>
          </div>
        return presentacion;
      }

      //metodo sumar.
      sumar =(e)=> {
       this.setState({
           contador: (this.state.contador + 1)
       }); 
      }

      //metodo restar.
      restar =(e)=> {
        this.setState({
            contador: (this.state.contador - 1)
        });
      }

    render() {
        var nombre = "david";
        return (
            <section id="content">

                <h2 className="subheader">Últimos Artículos</h2>

                <p>Edit <code>src/App.js</code> and save to reload.</p>

                <h2 className="subheader">Funciones y jsx basico</h2>
                {this.HolaMundo(nombre, 12)}

                <h2 className="subheader">Componentes</h2>
                <section className="componentes">

                    <MiComponente></MiComponente>
                    
                </section>

                <h2 className="subheader">Estado</h2>
                <p>
                    contador : {this.state.contador}
                </p>
                <p>
                    <input type="button" value="sumar" onClick={this.sumar}></input>
                    <input type="button" value="restar" onClick={this.restar}></input>
                </p>

            </section>
        );
    }
}

export default SeccionPruebas;