import React from 'react'
import "./Paginate.css"


export default function Paginate({dogByPage, dogs, paginate, setCurrentPage, currentPage,}) {
  
    const pageNumber=[];
    let numPage = Math.ceil(dogs/dogByPage );
    for(let i=1; i <= numPage; i++){
    pageNumber.push(i)
  }
    return (
    <div>
        <ul className='button'>
            <button 
            disabled={currentPage === 1}
            onClick={()=>
            setCurrentPage(currentPage === 1? 
            currentPage:
            currentPage - 1)}>Previo</button> 
            {pageNumber && pageNumber.map((number)=>( 
            <button
            disabled={currentPage === number}
            key={number}
            onClick={()=> paginate(number)}>{number}
            </button>
            ))}
            <button
            disabled={currentPage === pageNumber.length}
            onClick={()=> 
            setCurrentPage(currentPage === numPage?
            currentPage:
            currentPage + 1)}>Siguiente</button> 
        </ul>
    </div>
  )
}


