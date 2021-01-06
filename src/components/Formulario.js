import React, {Component} from "react";

import Sidebar from "./Sidebar";

class Formulario extends Component{

    //creamos el ref de cada uno.
    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef= React.createRef();
    generoHombreRef= React.createRef();
    generoMujerRef= React.createRef();
    generoOtroRef= React.createRef();

    state ={
        user: {}
    }

    //creo mi metodo para el formulario, metodo que está dentro del onsubmit
    recibirFormulario =(e)=>{
        //para evitar que la pagina recarge cuando le hago onsubmit
        e.preventDefault();
        
        //como genero estan tres veces, entonces creamos una variable, y luego hacemos una condicion.
        var genero = "hombre";
        if(this.generoHombreRef.current.checked){
            genero = this.generoHombreRef.current.value;
        }else if(this.generoMujerRef.current.checked){
            genero = this.generoMujerRef.current.value;
        }else{
            genero = this.generoOtroRef.current.value;
        }

        var user= {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero,
        }

        //le asigno el valor user al state de arriba.
        this.setState({
            user: user
        });
         
        console.log(user)
     
    }

    render(){
        
        return(
           <div id="formulario">
            

           <div className="center">
                <div id="content">
                    <h1 className="subheader">Formulario</h1>
                    {/* mostrar datos de formulario cuando existan */}
                    
                    {this.state.user.nombre &&
                       <div id="user-data">
                           <p>Nombre: <strong>{this.state.user.nombre}</strong> </p>
                           <p>Apellidos: <strong>{this.state.user.apellidos}</strong> </p>
                           <p>Biografia: <strong>{this.state.user.bio}</strong> </p>
                           <p>Genero: <strong>{this.state.user.genero}</strong> </p>
                       </div>

                    }



                        {/* crear un formulario con react */}
                        {/* debo vincular mi formulario a un metodo. */}
                        {/* para recoger los datos del formulario y mostrarlos, es con : ref */}
                        {/* aparte del evento onsubmit, tambien hay otros, ejemplo el metodo onchange, que hace que cambie la informacion de manera reactiva. */}
                <form className="full-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" id="" ref={this.nombreRef}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Apellidos">Apellidos</label>
                    <input type="text" name="Apellidos" id="" ref={this.apellidosRef}/>
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Biografia</label>
                    <textarea name="bio" id="" cols="30" rows="10" ref={this.bioRef}></textarea>
                </div>
                <div className="form-group radio-buttons">
                    <input type="radio" name="genero" id="" value="hombre" ref={this.generoHombreRef}/>Hombre
                    <input type="radio" name="genero" id="" value="mujer" ref={this.generoMujerRef}/>Mujer 
                    <input type="radio" name="genero" id="" value="otro" ref={this.generoOtroRef}/>Otro
                </div>
            <div className="clearfix"></div>
                <input type="submit" value="Enviar" className="btn btn-success"/>
            </form>

                </div>
                <Sidebar
                  //props.
                  blog="false"
                  

                ></Sidebar>
           </div>

           </div>
        );
    }
}

export default Formulario;