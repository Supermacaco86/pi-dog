import axios from "axios";

export function getDogs(exist){ 
    return async function (dispatch){
        if(exist){
            var json = await axios.get(`/filter/${exist}`)
            return dispatch({
                type: 'GET_DOGS',
                payload: json.data
            })
            }else{
                var json1 = await axios.get(`/dogs`)
            return dispatch({
                type: 'GET_DOGS',
                payload: json1.data
            })    
        }
    }
};    


export function getDogByName(payload){
    return async function(dispatch){
       try{
            var json = await axios.get(`/dogs?name=${payload}`)
            return dispatch({
                type: 'GET_DOG_BY_NAME',
                payload: json.data
            })
        }catch(error){
          if(error.response)
           alert(error.response.data)  
     console.log(error)   
        }
    }
};

export function getTemps(){
    return async function(dispatch){
        var json = await axios.get("/temps",{})
        return dispatch({
            type: 'GET_TEMPS',
            payload: json.data 
        })
    }
};

export function getDetails(id){
    return async function (dispatch){
        try{
            var json = await axios.get(`/dogs/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
    })
}catch (error){
    if(error.response){
        alert(error.response.data)
        window.location.href = 'http://localhost:3001/Home'
            }
        }
    }
};

export function getClean () {
    return{
        type: "GET_CLEAN",
        payload: []
    }
};

export function filterByTemp(value){
    return {
      type: 'FILTER_BY_TEMP',
      payload: value 
    };
};

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};


  export function aplhabeticalSort(payload) {
    return {
        type: 'ALPHABETICAL_SORT',
        payload
    }
};

export function orderByWeight(payload){
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
};


// export function addDogs(payload){
//     return async function(dispatch){
//         var json = await axios.post("/dogs",payload)
//         return json
//     }
// }
