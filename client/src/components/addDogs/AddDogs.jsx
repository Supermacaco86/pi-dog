import React from "react";
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addDogs, getTemps} from "../../actions/index";
import {useDispatch, useSelector } from "react-redux";
//import axios from "axios";
import "./AddDogs.css"

 
export default function AddDogs(){
    const dispatch = useDispatch();
    const history = useNavigate();
    const temperaments = useSelector((state) => state.temps);
    // console.log(temps)
    //const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        image: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_min: "",
        life_max: "",
        temp: [],
      });
console.log(input)

      function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
        // setErrors(validate({
        //     ...input,
        //     [e.target.name]:e.target.value
        // }))
    }

    function handleSelect(e) {
        if(!input.temp.includes(e.target.value)){
        setInput({
            ...input,
            temp: [...input.temp, e.target.value],
        });
        }
    }
      function handleDelete(e) {
        setInput({
          ...input,
          temp: input.temp.filter(t => t !== e),
        })
       // console.log(input);
      }

      async function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(addDogs(input))
       alert("Perro creado correctamente!")
       setInput({
                name: "",
                image: "",
                height_min: "",
                height_max: "",
                weight_min: "",
                weight_max: "",
                life_min: "",
                life_max: "",
                temp: [],
       })
       history('/home')
      }

    useEffect(() => {
        dispatch(getTemps());
      }, [dispatch]);
    


    return(
        <div className="todo">
        <div className="form__group">
            <Link to="/home">
            <button>Volver a home</button>
            </Link>

            <h1 className="letra">Crea un nuevo perro!</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
            <label>Raza:</label>
            <br/>
                <input
                className="form__field w-100"
                type="text"
                value={input.name}
                name="name"
                id="name"
                required
                placeholder="Raza..."
                onChange={(e) => handleChange(e)}
            />
            <br/>
            <label>Tamaño:</label>
            <div>
                <input
                className="form__field w-100"
                type="number"
                min="1"
                max="100"
                value={input.height_min}
                name="height_min"
                id="height_min"
                required
                placeholder="Min"
                onChange={(e) => handleChange(e)}
            />cm.
            </div>
            <div>
                <input
                className="form__field w-100"
                type="number"
                min="1"
                max="100"
                value={input.height_max}
                name="height_max"
                id="height_max"
                required
                placeholder="Max"
                onChange={(e) => handleChange(e)}
            />cm.
            </div>
            <label>Peso:</label>
            <div>
                <input
                className="form__field w-100"
                type="number"
                min="1"
                max="100"
                value={input.weight_min}
                name="weight_min"
                id="weight_min"
                required
                placeholder="Min"
                onChange={(e) => handleChange(e)}
            />kg.
            </div>
            <div>
                <input
                className="form__field w-100"
                type="number"
                min="1"
                max="100"
                value={input.weight_max}
                name="weight_max"
                id="weight_max"
                required
                placeholder="Max"
                onChange={(e) => handleChange(e)}
            />kg.
            </div>
            <label>Años de vida:</label>
            <div>
                <input
                className="form__field w-100"
                min="1"
                max="100"
                type="number"
                value={input.life_time_min}
                name="life_min"
                id="life_min"
                required
                placeholder="Min"
                onChange={(e) => handleChange(e)}
                />{" "}años
            </div>
            <div>
                <input
                className="form__field w-100"
                min="1"
                max="100"
                type="number"
                value={input.life_time_max}
                name="life_max"
                id="life_max"
                required
                placeholder="Max"
                onChange={(e) => handleChange(e)}
            />{" "}años.
            </div>
            <label>Imagen:</label>
            <input
                className="form__field w-100"
                type="imagen"
                value={input.image}
                name="image"
                placeholder="URL"
                onChange={(e) => handleChange(e)}
            />
            <br/>
            <label>Temperamentos:</label>
                <select className="form__field w-100" onChange={(e) => handleSelect(e)}>
                {temperaments.map((e) => (
                <option value={e} key={e}>{e}</option>
                ))}</select>
                {input.temp?.map(e =>
                <div>
                    <spam onClick ={()=>handleDelete(e)}>{e}</spam>
                    <button key={e} className="botonX" onClick={()=> handleDelete(e)}>X</button>

                </div>
                )}
                <br/>
                <div>
                <button type="submit">Crear!</button>
                </div> 
             </form>
        </div>
        </div>
    )
}



  {/* <ul><li>{input.temp?.map((e) =>
                 <div>
                    <p>{e}</p>
                        <button key={e} onClick={()=>handleDelete(e)}>x</button>
                </div>
                )}</li></ul> */}

//function validate(input){
//     let errors = {};
//     if (!input.name || isNaN(input.name) === false) errors.name = 'Por favor complete el nombre del perro';
//     if (!input.summary) errors.summary = 'Por favor agregue algun comentrio ';
//     if (input.score < 1 || input.score > 100) errors.score = 'El puntaje debe ser un valor entre 1 y 100';
//     if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'El valor saludable debe ser un numero entre 1 y 100';
//     if (!input.steps.length) errors.steps = 'Por favor, detalle los pasos a seguir de su receta';
//     return errors;
//}

