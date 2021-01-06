//para el componente de error utilizo un componente estatico
import React from "react";

const Error= ()=>{
    return(
        
        <section id="content">

                <h2 className="subheader">pagina no encontrada</h2>
                <p>la pagina a la que intentas acceder no existe en la web</p>
        </section>

    );
}
export default Error;