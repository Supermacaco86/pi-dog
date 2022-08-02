import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {getDogByName} from "../../actions/index";
import "./SearchBar.css"


function validacion(input){
    let error = {}; 
    if(!input || isNaN(input) !== true){
        error.input = "Se requiere un nombre de perro"
    }
    return error
}


export default function SearchBar({setCurrentPage}){
    const [error, setError]= useState({})
    const dispatch = useDispatch()
    const [input, setInput] = useState("")
    console.log(error)


    function handleInputChange(e){
        e.preventDefault();
        setInput(e.target.value)//tomo para el estado local el valor del input
    }
    
    // function handleSubmit(e){
    //     e.preventDefault();
    //     dispatch(getDogByName(input))
    //     setInput('')
    //     setCurrentPage(1)
    // }
    function handleSubmit(e){
        e.preventDefault();
        setError()
        setError(validacion(input))
        const errorValidador = validacion(input)
        if(Object.values(errorValidador).length !== 0){
            alert("Se requiere un nombre de perro")
        }else{
            dispatch(getDogByName(input))
            setInput('')
            setCurrentPage(1)
        }
    }

    return(
        <div className="form__group">
        <div >
            <input className="form__field w-100"
            value= {input}
            type = 'text'
            placeholder="Buscar..."
            onChange={(e)=>handleInputChange(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button> 
        </div>
        </div>
    )
}
//