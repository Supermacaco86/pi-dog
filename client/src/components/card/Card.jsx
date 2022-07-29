import React from "react";
import {Link} from "react-router-dom"
// import "../styles/Card.css"


export default function Card({id, image, name, temp, weight_min, weight_max }) {
    return(
        <div>
            <Link to={`/home/${id}`}>
            <h3>{name}</h3>
            </Link>
            <img src={image} alt="img not found"width="350px"height="250px"/>
            <h5>{temp}</h5>
            <h4>{weight_min} - {weight_max}kg.</h4> 
        </div>    
    )
}


     