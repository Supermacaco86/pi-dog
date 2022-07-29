import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import LandingPage from "./components/landigPage/LandingPage";
import Home from "./components/home/Home";
import AddDogs from "./components/addDogs/AddDogs";
import Details from "./components/details/Details";
import SearchScreen from "./components/searchScreen/SearchScreen";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' exact element={<Home/>}/>
        <Route path='/post' exact element={<AddDogs/>}/> 
        <Route path='/search' exact element={<SearchScreen/>}/>
        <Route exact path="/home/:id" element={<Details/>}/>  
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
