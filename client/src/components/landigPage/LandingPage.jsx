import React from "react";
import {Link} from "react-router-dom";
//import "../Estilos/landingPage.css" 

export default function landingPage (){
    return(
        
        <div>
            <h1 >Encontra tu perro favorito!</h1>
            <Link to = "/home">
                <button>Ingresar</button>
            </Link>
        </div>
        
    )
}