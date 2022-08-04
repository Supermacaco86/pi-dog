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
        if(!input.temp.includes(e.target.value) && input.temp.length <= 4){
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
       alert("created")
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
       setTimeout(function(){
           history('/home')
       },5000 )
      }

    useEffect(() => {
        dispatch(getTemps());
      }, [dispatch]);
    

      const alert = function(error){
        if (error !== 'undefined') {
          const mod = document.getElementById('alert')
          const modText = document.getElementById('content-text')
          if (error === 'created') {
            mod.style.cssText = 'display: flex; background-color: rgba(79, 240, 10, 0.87); min-height: 40px; width: 430px; border-radius: 50px; margin-top: 7px; padding: 20px;'
            modText.innerHTML = '<strong>¡Felicitaciones!</strong>. Has creado a ' + `<strong>${input.name}</strong>`
            setTimeout(function(){
              mod.style.display='none'
            }, 5000)
          }else {
            mod.style.cssText = 'display: flex; background-color: rgba(240, 10, 10, 0.87); min-height: 40px; width: 430px; border-radius: 50px; margin-top: 7px; padding: 20px;'
            modText.innerHTML = '<strong>¡Momentito!</strong>. No podes dejar ' + `${error}` + ' vacio. Por favor complete todos los datos requeridos'
            setTimeout(function(){
              mod.style.display='none'
            }, 3000)
          }
        }
      }

      const funcion = function(){
        let d = input;
        for(const e in d) {
          if (!d[e] || !d[e].length) {
            alert(e)
          }else {
            continue
          }break
        }
      }


    return(
        <div className="todo">
        <div className="form_group">
            <Link to="/home">
            <button>Volver a home</button>
            </Link>

            <h1 className="letra">Crea un nuevo perro!</h1>
            <div className="content__alert" id='alert' style={{display: "none"}}>
            <div id='content-text' ></div>
            </div>
            <form className="form_contain"  onSubmit={(e) => handleSubmit(e)}>
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
            <div className="form_tamyPeso">
            <div className="form_tam">
            <label>Tamaño:</label>
            <div>Desde:
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
            <div>Hasta : 
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
            </div>
            <div className="form_peso">
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
            </div>
            </div>
            <label>Años de vida:</label>
            <div>Desde:
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
            <div>Hasta :
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
                <div className="divMouse" onMouseEnter={funcion}>
                <button
                disabled={
                    !input.name ||
                    !input.height_min ||
                    !input.height_max ||
                    !input.weight_min ||
                    !input.weight_max ||
                    !input.life_min ||
                    !input.life_max ||
                    !input.temp.length
                }
                type="submit">Crear!</button>
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

