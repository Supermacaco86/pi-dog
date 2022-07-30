import React from "react";
import {Link} from "react-router-dom"
import "./Card.css"



export default function Card({id, image, name, temp, weight_min, weight_max }) {
    return(
        <div className="card">
            <div className="face front">
                <img src={image} alt="imgen no encontrada"/>
                <h3>{name}</h3>  
            </div>
            <div className="face back">
                <div className="link">
                    <Link to={`/home/${id}`}><h3>{name}</h3> </Link>
                </div>
                <div>Temperamento:</div>
                <p>{temp}</p>
                <p>{weight_min} - {weight_max}kg.</p> 
               
            </div>  
        </div>    
    )
}


     