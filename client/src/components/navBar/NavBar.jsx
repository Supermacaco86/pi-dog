import React from 'react'
import {Link} from "react-router-dom"
import SearchBar from '../searchBar/SearchBar';
import "./NavBar.css"

export default function Navbar({setCurrentPage}) {
  return (
    <div className='navBar'>
      <div className='titulo' >
        <h1>Perros del mundo</h1>
      </div>
      <div className="search">
        <SearchBar 
        setCurrent Page={setCurrentPage}
      />
      </div>
      <div className='link'>
          <Link to="/post">
          <p>Creá tu propio perro</p>
          </Link>
        </div>
    </div>
  )
  
}
