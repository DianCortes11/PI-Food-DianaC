import { GET_RECIPES, GET_RECIPES_BY_NAME, FILTER_BY_DIET, ORDER_BY_NAME, ORDER_BY_SCORE, GET_DIETS, POST_NEW_RECIPE, GET_DETAIL } from "../actions/actions";

const initialState = {     
    allRecipes: [],
    recipes : [],    
    detail : [],
    diets: []  
};

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipes: action.payload
            }

        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes
            var arra1 = []
            allRecipes.map((d) => {
                const darray = d.diets.map((e) => {
                    if(typeof e === 'object'){
                        return e.name
                    } else {
                        return e
                    }
                }); if(darray.includes(action.payload)){
                    arra1.push(d)
                } 
            })

            const filterDiet = action.payload === 'All'? allRecipes: arra1
                return {
                    ...state,
                    recipes: filterDiet
                }

        case ORDER_BY_NAME:
            let order = action.payload === 'asc' ? 
            state.recipes.sort(function(a,b) {
                
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1
                }
                if( b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1
                }
                return 0
            }) : 
            state.recipes.sort(function(a,b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1
                }
                if( b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                recipes: order
            }

        case ORDER_BY_SCORE:
            console.log('byscore', action.payload)
            let orderScore = action.payload === 'high' ? 
            state.recipes.sort(function(a,b) {
                if(a.score > b.score) {
                    return 1
                }
                if(b.score > a.score){
                    return -1
                }
                return 0
            }) : 
            state.recipes.sort(function(a,b) {
                if(a.score > b.score) {
                    return -1
                }
                if(b.score > a.score){
                    return 1
                }
                return 0
            })
            return{
                ...state ,
                recipes : orderScore
        }
                
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            } 

        case POST_NEW_RECIPE:
            return {
                ...state
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;