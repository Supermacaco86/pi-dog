import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import {Link} from "react-router-dom"
import {getDogs, getTemps, orderByName, filterByTemp, orderByWeight} from '../../actions/index';
import NavBar from '../navBar/NavBar.jsx';
import Cards from '../cards/Cards';
import Filters from "../filters/Filters";
import "./Home.css"




export default function Home(){
    const allTemps = useSelector(state => state.temps);
    const dogs = useSelector(state => state.dogs);
    const dispatch = useDispatch();
    //console.log(dogs)

    const[currentPage, setCurrentPage]= useState(1);
    const[dogByPage]=useState(8);
    const [order, setOrder] = useState('');

    console.log(order)

    let indexLastDog = currentPage * dogByPage;
    let indexFirstDog = indexLastDog - dogByPage;
    let currentDog = dogs.slice(indexFirstDog,indexLastDog);

    const paginate= (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

    useEffect(() =>{
        dispatch(getDogs());
    },[dispatch])

    useEffect(() =>{
        dispatch(getTemps());
    }, [dispatch]);

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }
    
    function handleSortWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleFilterTemp(e) {
        e.preventDefault(e);
        dispatch(filterByTemp(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
      }

    
     function handleReset(e) {
         e.preventDefault();
         window.location.reload();
    }


    return(
        <div className="home"> 

      
        <NavBar
        setCurrentPage={setCurrentPage}
        />
        <Filters
        allTemps={allTemps}
        handleReset={handleReset}
        handleSort={handleSort}
        handleFilterTemp={handleFilterTemp}
        handleSortWeight={handleSortWeight}
        />
        <Cards 
        dogByPage={dogByPage}
        dogs={dogs}
        paginate={paginate}
        currentDog={currentDog}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
        </div>
    )
}