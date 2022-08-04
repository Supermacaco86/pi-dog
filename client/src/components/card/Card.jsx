import React from "react";
import {Link} from "react-router-dom"
import { getTemps } from "../../actions";
import "./Card.css"



export default function Card({id, image, name, temp, weight_min, weight_max }) {
    console.log(temp)
    return(
        <div className="card">
            <div className="face front">
                <img src={image} alt="imgen no encontrada"/>
                <h3>{name}</h3>  
            </div>
            <Link to={`/home/${id}`}>
            <div className="face back">
                <div className="link">
                </div>
                <div>
                <div className="temp">Temperamento:</div>
                {
                    temp?temp.map((e) => {
                        return <p className="pTemp" key={e}>{e}</p>
                    }):"Codigo roto jajajaja"
                }
                <p>{weight_min} - {weight_max}kg.</p> 
                </div>
            </div>  
            </Link>
        </div>    
    )
}


     