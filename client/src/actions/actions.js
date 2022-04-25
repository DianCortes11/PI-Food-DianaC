import axios from 'axios';

export const GET_RECIPES = 'getRecipes';
export const GET_RECIPES_BY_NAME = 'getRecipesByName';
export const FILTER_BY_DIET = 'filterByDiet';
export const ORDER_BY_NAME = 'orderByName';
export const ORDER_BY_SCORE = 'orderByScore';
export const GET_DIETS = 'getDiets';
export const POST_NEW_RECIPE = 'postNewRecipe';
export const GET_DETAIL = 'getDetail';



export function getRecipes() {
    return async function (dispatch) {
      var json = await axios.get('http://localhost:3001/recipes');
      return dispatch({
        type: GET_RECIPES,
        payload: json.data,
      })
    }
  }
  
  export function getRecipesByName(name){
    return async function(dispatch){
      try {
        var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        return dispatch({
          type: GET_RECIPES_BY_NAME,
          payload: json.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  export function filterByDiet(payload){
    return{
      type: FILTER_BY_DIET,
      payload
    }
  }
  
  export function orderByName(payload){
    return{
      type: ORDER_BY_NAME,
      payload
    }
  }
  
  export function orderByScore(payload){
    return{
      type: ORDER_BY_SCORE,
      payload
    }
  }
  
  export function getDiets(){
    return async function(dispatch){
      var json= await axios.get(`http://localhost:3001/types`);    
      return dispatch({
        type: GET_DIETS,
        payload: json.data
      })
    }
  }
  
  export function postNewRecipe(payload){
    return async function(dispatch){
      var json= await axios.post('http://localhost:3001/recipe', payload);
      return json;
    }
  }
  
  export function getDetail(id){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch( {
        type : GET_DETAIL,
        payload: json.data
    })
    }
}