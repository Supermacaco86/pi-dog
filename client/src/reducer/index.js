const initialState ={
    dogs: [],
    temps: [],
    details: [],
    allDogs: [],
    loading: true
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload, 
                loading: false             
            };

        case 'GET_DOG_BY_NAME':
            return{
                ...state,
                dogs: action.payload
            };
        case 'GET_TEMPS':
            return{
                ...state,
                temps: action.payload              
            };
        case "GET_DETAILS":
            return{
                ...state,
                details: action.payload,
                loading: false
            };
        case "GET_CLEAN":
            return {
                ...state,
                detail: action.payload
            };

        case 'FILTER_BY_TEMP':
            const dogsState = state.allDogs;
            //console.log(dogsState[0])
           const temperamentsFilter = dogsState.filter((e)=>{
            return e.temp?.split(", ").includes(action.payload)
           })
            return {
                ...state,  
                dogs: [...temperamentsFilter]    
            };
            
        case "ORDER_BY_NAME":
                let sortName = action.payload === 'asc' ? 
                state.dogs.sort(function (a, b){
                    if (a.name > b.name){return 1};
                    if (b.name > a.name){return -1};
                    return 0;
                }) :
                state.dogs.sort(function(a, b){
                    if (a.name > b.name){return -1};
                    if (b.name > a.name){return 1};
                    return 0;
                })
                return{
                    ...state,
                    dogs: sortName
            };

        case 'ALPHABETICAL_SORT':
            let sortByAlfa = [...state.dogs]
            sortByAlfa = action.payload === "atoz"?
            state.dogs.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1};
                 if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1};
                    return 0;
                }):
            state.dogs.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return 1};
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1};
                    return 0;
                });
            return{
                ...state,
                dogs: sortByAlfa
            };

        case 'ORDER_BY_WEIGHT':
            let sortWeight = action.payload === 'weightasc' ? 
            state.dogs.sort(function (a, b){  
            return b.weight_min - a.weight_min;
            }) :
            state.dogs.sort(function(a, b){
            return a.weight_min - b.weight_min;
            })
            return{
            ...state,
            dogs: sortWeight
            };
            
        case "FILTER_CREATED":
            const allDogsCreated = state.allDogs;
            const createdFilter = action.payload === 'created' ? 
            allDogsCreated.filter(e => e.dogCreated)
            : allDogsCreated.filter(e => !e.dogCreated)
                //console.log(allDogs)
            return {
            ...state,
            dogs: action.payload === "all" ? allDogsCreated : createdFilter
            };
        default:
            return state;
    }
}



export default rootReducer