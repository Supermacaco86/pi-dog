import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDogs, getTemps, orderByName,handleLife, filterByTemp, orderByWeight, orderByheight} from '../../actions/index';
import NavBar from '../navBar/NavBar.jsx';
import Cards from '../cards/Cards';
import Filters from "../filters/Filters";
import "./Home.css"
import Loading from "../loading/Loading";




export default function Home(){
    const allTemps = useSelector(state => state.temps);
    const dogs = useSelector(state => state.dogs);
    const loading = useSelector(state=> state.loading)
    const dispatch = useDispatch();
    console.log(allTemps)

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

    function handleSortheight(e) {
        e.preventDefault();
        dispatch(orderByheight(e.target.value));
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
        // handleLife={handleLife}
        handleSortheight={handleSortheight}
        handleReset={handleReset}
        handleSort={handleSort}
        handleFilterTemp={handleFilterTemp}
        handleSortWeight={handleSortWeight}
        setCurrentPage={setCurrentPage}
        />
        {loading && <Loading/>}
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