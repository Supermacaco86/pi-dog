import React from "react";
//import "../styles/Loading.css"

export default function Loading({setLoading}){
    return(
    <div>
        <h1>Cargando</h1>
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
