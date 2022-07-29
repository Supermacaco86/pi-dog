import React from 'react'
import {Link} from "react-router-dom"
import SearchBar from '../searchBar/SearchBar';

export default function Navbar({setCurrentPage}) {
  return (
    <div>
      <SearchBar
      setCurrentPage={setCurrentPage}
      />
    <Link to='/home'>
    <div>home</div>
    </Link>
    
    </div>
  )
  
}
