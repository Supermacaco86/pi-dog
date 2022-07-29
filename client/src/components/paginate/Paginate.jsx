import React from 'react'


export default function Paginate({dogByPage, dogs, paginate, setCurrentPage, currentPage,}) {
  
    const PageNumber=[];
    let numPage = Math.ceil(dogs/dogByPage );
    for(let i=1; i <= numPage; i++){
    PageNumber.push(i)
  }

    return (
    <div>
        <ul>
             <button onClick={()=>
            setCurrentPage(currentPage ===1? 
            currentPage:
            currentPage-1)}>Previo</button> 
            {PageNumber && PageNumber.map((number)=>(
            <button 
            key={number}
            onClick={()=> paginate(number)}>{number}
            </button>
            ))}
             <button onClick={()=> 
            setCurrentPage(currentPage ===numPage?
            currentPage:
            currentPage + 1)}>Siguiente</button> 
        </ul>
    </div>
  )
}