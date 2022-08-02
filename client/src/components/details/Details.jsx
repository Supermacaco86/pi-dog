import React from "react";
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetails, getClean,  deleteDog} from "../../actions/index";
import {useEffect} from "react";
import Loading from "../loading/Loading";
import "./Details.css"



export default function Details(){
    const history = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    //const [loading, setLoading] = useState(true);
    //const id = props.match.params.id;
    const details = useSelector((state)=>state.details)
    const loading = useSelector((state) => state.loading)
    console.log(details)

    function handleDelete(e){
        e.preventDefault(e);
        dispatch(deleteDog(id))
        alert("Perro borrado correctamente!")
        history('/home')
    } 

    useEffect(() => {
        dispatch(getDetails(id))
     {dispatch(getClean())}
    }, [dispatch, id])

    if (details.length && details[0].life_span) {
        var lifeSpan = details[0].life_span;
    }else if(details.length && details[0].life_min) {
        var lifeSpan = details[0].life_min + ' a ' + details[0].life_max;
    }

    if(details.length === 0){
        return(
             <Loading/>
        )
    }else{
    return(
        <div className="details">
            
             <div>
            <img alt="img" width="250px"height="150px" src= {details.length? details[0].image:"Imagen no encontrada"}/>
            <h2>Nombre: { details.length? details[0].name: "Cargando"}</h2>
            <h3>Temperamento: { details.length? details[0].temp: "Cargando"}</h3>
            <h3>Peso: { details.length? details[0].weight_min: "Cargando"} - { details.length? details[0].weight_max: "Cargando"} kg.</h3>
            <h3>Altura: { details.length? details[0].height_min: "Cargando"} - { details.length? details[0].height_max: "Cargando"} Cm.</h3>
            <h3>Tiempo de vida {lifeSpan} años</h3>
            <Link to="/home"><button >Volver a home</button></Link>
            <button onClick={handleDelete}>Borrar</button>
            </div>  
            </div>
    
    )
}
}