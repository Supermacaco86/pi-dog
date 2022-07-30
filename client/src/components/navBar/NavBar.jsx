import React from 'react'
import {Link} from "react-router-dom"
import SearchBar from '../searchBar/SearchBar';
import "./NavBar.css"

export default function Navbar({setCurrentPage}) {
  return (
    <div className='navBar'>
      <div >
        <SearchBar 
        setCurrent Page={setCurrentPage}
      />
      </div>
      <div>
          <Link to="/post">
          <p>Creá tu propio perro</p>
          </Link>
        </div>
        {/* <Link to='/home'>
        <div>home</div>
        </Link> */}
    
    </div>
  )
  
}
