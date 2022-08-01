import React from "react";
import "./Loading.css"
import loadingdog from "../../Imagenes/loading-dog.gif"


export default function Loading({setLoading}){
    return(
    <div className="loading-contain">
        <img className="tamaño" src={loadingdog} alt="Imagen no encontrada"/>
        <div>
             {
                 setTimeout(() =>{
                     setLoading(false)
                 }, 5000)
             }
         </div>
    </div>
    )
}
