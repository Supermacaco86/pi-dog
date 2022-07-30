import React from "react";


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
