import React, { Component } from "react";
import logo from '../assets/images/logo.svg';

//para hacer funcionar los enlaces al darle click y navegar con el menú.

 import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (

            <header id="header">

        <div className="center">

         <div id="logo">
           <img className="app-logo" src={logo} alt="logotipo"></img>
            <span id="brand"><strong>Curso</strong>React</span>
         </div>


             <nav id="menu">
                            <ul>
                                <li>
                                    {/* para resaltar el enlace y saber donde estoy. es con activeClassName */}
                                    <NavLink to="/home" activeClassName="active">Inicio</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blog" activeClassName="active">Blog</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/formulario" activeClassName="active">Formulario</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/peliculas">peliculas</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/pruebas/:id" activeClassName="active">Pagina 2</NavLink>
                                </li>
                            </ul>
                        </nav>

                    </div>
                    <div className="clearfix"></div>
                
            
            </header>
            
        )
    }
}

export default Header;
