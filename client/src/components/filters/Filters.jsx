import React from "react";
import {useDispatch} from "react-redux";
import {getDogs} from "../../actions";
import "./Filters.css"





export default function Filters({ allTemps, setCurrentPage, handleReset, handleSort, handleFilterTemp, handleSortDogs, handleSortWeight}) {
const dispatch = useDispatch();

function onChageExist(e){
    let value = e.target.value;
    dispatch(getDogs(value))
    //setInput('')
    setCurrentPage(1)
}


    return (
        <div className="total" >
           

        <div className="filtros">    
     

        <div className="form__group" >
        <select className="form__field w-100" onChange={onChageExist}>
            <option value="" disabled selected>Filtro creados</option>
            <option value="all">Todos</option>
            <option value="exist">De API</option>
            <option value="created">De database</option>
        </select>

        <select className="form__field w-100" onChange={(e) => handleFilterTemp(e)}>
            <option value="" disabled selected>Filtro por temperamento</option>
            <option value="all">Todos</option>
            {allTemps.map((e) => (
            <option key={e} value={e}>{e}</option>
            ))}
            </select>
        </div>
          
        <div className="orden">
        
        <select className="form__field w-100" onChange={(e) => handleSortWeight(e)}>
            <option value=""disabled selected >Orden por peso</option>
            <option value="weightasc">Mas pesado</option>
            <option value="weightdesc">Mas liviano</option>
        </select>

        <select className="form__field w-100" onChange={(e) => handleSort(e)}>
            <option value=""disabled selected >Orden alfabetico</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
        </select>
        </div>
        </div>

        <button onClick={(e)=>handleReset(e)}>Recargar</button>
        
        </div>
    );
  }
  