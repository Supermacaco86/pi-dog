import React from "react";
import Card from "../card/Card";
import Paginate from "../paginate/Paginate";
import "./Cards.css"
// import {Link} from "react-router-dom"




export default function Cards({dogByPage, dogs, paginate, currentDog, setCurrentPage,currentPage}){
   
    return (
        <div>
        <Paginate
        dogByPage={dogByPage}
        dogs={dogs.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
        <div className = "gallery">
        {currentDog.map((e)=>{
            return (
                <Card 
                key={e.id}
                id={e.id}
                name={e.name}
                image={e.image}
                temp={e.temp}
                weight_min={e.weight_min}
                weight_max={e.weight_max}
                />
                )
        })
        }
        <Card/>
        </div>
        </div>
      )
    }


