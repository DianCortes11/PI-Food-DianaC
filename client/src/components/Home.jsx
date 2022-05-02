import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterByDiet, orderByName, orderByScore, getDiets } from "../actions/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import styles from './Home.module.css';

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage]= useState(9) //eslint-disable-line
    const indexOfLastRecipe = currentPage * recipesPerPage; 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const[orden, setOrden] = useState(''); // eslint-disable-line                                                    
    const[order, setOrder] = useState(''); // eslint-disable-line

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes());
        dispatch(getDiets());
    },[dispatch]) 

    const diets = useSelector(state => state.diets)

    function handleFilterDiets(e){
        dispatch(filterByDiet(e.target.value))
    }

    function handleAbc(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`ordered ${e.target.value}`)
    }

    function handleScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrder(`ordered ${e.target.value}`)
    }
console.log(currentRecipes)
    return(
        <div className = {styles.container}>
            <h1 className = {styles.title}>Recipes</h1>
            <SearchBar/>
            <Link to= '/recipe'><button className = {styles.createButton}>Create Recipe</button></Link>                       
            <div>            
            <select onChange={e=>handleAbc(e)} className = {styles.select}>
                <option value='asc'>A to Z</option>
                <option value='desc'>Z to A</option>
            </select>              
            <select onChange={e=>handleFilterDiets(e)} className = {styles.select}> 
                <option value='All'>All Diets</option>
                {diets?.map(diet => <option value={diet.name} key={diet.name}>{diet.name}</option> )}                                    
            </select> 
            <select onChange={e=> handleScore(e)} className = {styles.select}>
                <option value='high'>High Score</option>
                <option value='low'>Low Score</option>                 
            </select>

            <div className = {styles.cards}>                         
                {currentRecipes?.map((el)=>{
                    return( 
                        <React.Fragment>                      
                            <Link to={'/recipes/' + el.id} key={'l' + el.id} style={{ textDecoration: 'none' }}>
                                <Card key={el.id} id={el.id} img={el.image} name={el.name} diets={el.diets}/>
                            </Link> 
                        </React.Fragment>                         
                    )})                               
                }
            </div>
            <div>
            <Pagination key= {1} recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagination={pagination}/>
            </div>
                
            </div>
        </div>
    )

}