import React, {Component} from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";


class Search extends Component{

  
    render(){
        var searched= this.props.match.params.search
        
        return(
           <div id="blog">
             <Slider  //etiqueta del slider.
                 title={"Busqueda: " + searched  }
                 size="slider-small"
                
             ></Slider>

           <div className="center">
                <div id="content">
                        {/* listado de articulos que vendran del api rest con node */}
                        <Articles
                        //props
                         search={searched}
                           
                        ></Articles>
                       
                </div>
                <Sidebar
                  //props.
                  blog="true"
                  

                ></Sidebar>
           </div>

           </div>
        );
    }
}

export default Search;