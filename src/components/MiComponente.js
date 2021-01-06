import React, {Component} from "react";

class MiComponente extends Component{
   render(){

       let receta= {
          nombre: "pizzas del gordo",
          ingredientes: ["queso", "pollo", "champiñones"],
          calorias: 500
       };

       return(
           //se puede encerrar todo con react.fragment, o con un div. cualquier de los dos estan bien.
           <React.Fragment>
               <h1>{receta.nombre}</h1>
               <h2>{"calorias: " + receta.calorias}</h2>
               <h3>ingredientes:</h3>
               <ol>
               {
                   receta.ingredientes.map((ingrediente, i)=>{
                      console.log(ingrediente)
                      return( 
                          <li key={i}>
                              { ingrediente}
                          </li>  
                      )
                   })
               }
               </ol>
           </React.Fragment>
       );
   }

}
export default MiComponente;