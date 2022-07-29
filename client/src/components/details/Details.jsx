import React from "react";
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetails, getClean} from "../../actions/index";
import {useEffect, useState} from "react";
import Loading from "../loading/Loading";
//import "../styles/Details.css"


export default function Details(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    //const id = props.match.params.id;
    const detailDog = useSelector((state)=>state.details)
    console.log(detailDog)
 

    useEffect(() => {
        dispatch(getDetails(id))
    {dispatch(getClean())}
    }, [dispatch, id])

    return(
        <div>
             { loading === true? (<Loading setLoading={setLoading}/>):
             <div>
            <img alt="img" width="250px"height="150px" src= {detailDog.length? detailDog[0].image:"Imagen no encontrada"}/>
            <h2>Nombre: { detailDog.length? detailDog[0].name: "Cargando"}</h2>
            <h3>Temperamento: { detailDog.length? detailDog[0].temp: "Cargando"}</h3>
            <h3>Peso: { detailDog.length? detailDog[0].weight_min: "Cargando"} - { detailDog.length? detailDog[0].weight_max: "Cargando"} kg.</h3>
            <h3>Altura: { detailDog.length? detailDog[0].height_min: "Cargando"} - { detailDog.length? detailDog[0].height_max: "Cargando"} Cm.</h3>
            <h3>Estimado de vida de { detailDog.length? detailDog[0].life_min: "Cargando"} a { detailDog.length? detailDog[0].life_max: "Cargando"}</h3>
            <Link to="/home"><button >Volver a home</button></Link>
            </div>
                }
            </div>
    
    )
}