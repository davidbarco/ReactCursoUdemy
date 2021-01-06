import React, {Component} from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";


class Blog extends Component{

  
    render(){

        return(
           <div id="blog">
             <Slider  //etiqueta del slider.
                 title="blog"
                 size="slider-small"
                
             ></Slider>

           <div className="center">
                <div id="content">
                        {/* listado de articulos que vendran del api rest con node */}
                        <Articles></Articles>
                       
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

export default Blog;