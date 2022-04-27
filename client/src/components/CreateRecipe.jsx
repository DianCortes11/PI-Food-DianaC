import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecipe, getDiets } from '../actions/actions'
import styles from './CreateRecipe.module.css';

function validate (input){
    let error= {};
    if(!input.name){
        error.name = 'Name is required!';
    }else if(!input.summary){
        error.summary = 'Summary is required!';
    }else if(input.score < 0 || input.score > 10){
        error.score = 'The Score has to be lower or equal than 10'
    }
    return error;
}


export default function CreateRecipe(){
    const dispatch= useDispatch();          
    
    useEffect(()=>{
        dispatch(getDiets());
    }, []); //eslint-disable-line

    const diets = useSelector((state)=> state.diets)
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: '',
        summary:'',
        score:0,
        healthLevel:0,
        steps:'',
        image:'',
        diets:[],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets:[...input.diets, e.target.value]
        })
    } 
    function handleDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter(d=> d !== e)
        }) 
     }  

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postNewRecipe(input))        
        setInput({
        name: '',
        summary:'',
        score:0,
        healthLevel:0,
        steps:'',
        image:'',
        diets:[],
        })
    }   

    return(
        <div className = {styles.container}>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <h1 className = {styles.title}>Your Own Recipe Here!</h1>
                    <p className = {styles.subtitles}>Name: </p>
                    <input className = {styles.inputName} 
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={(e)=>handleChange(e)}
                    />                    
                    {error.name && <p className = {styles.error}>{error.name}</p>}
                </div>
                <div>
                    <p className = {styles.subtitles}>Summary: </p>
                    <textarea className = {styles.text} 
                    type='text'
                    value={input.summary}
                    name= 'summary'
                    onChange={(e)=>handleChange(e)}
                    />
                    {error.summary && <p className = {styles.error}>{error.summary}</p>}
                </div>
                <div>
                    <p className = {styles.subtitles}>Score: </p>
                    <input className = {styles.inputNumbers} 
                    type= 'number'
                    value={input.score}
                    name='score'
                    onChange={(e)=> handleChange(e)}/>
                    {error.score && <p className = {styles.error}>{error.score}</p>}
                </div>
                <div>
                    <p className = {styles.subtitles}>Health Level: </p>
                    <input className = {styles.inputNumbers} 
                    type= 'number'
                    value={input.healthScore}
                    name='healthScore'
                    onChange={(e)=> handleChange(e)}/>
                </div>
                <div>
                    <p className = {styles.subtitles}>Steps: </p>
                    <textarea className = {styles.text} 
                    type='textarea'
                    value={input.steps}
                    name='steps'
                    onChange={(e)=> handleChange(e)}/>                    
                </div>
                <p className = {styles.subtitles}>Diet Types: </p>
                <select className = {styles.select} onChange={(e)=> handleSelect(e)}>
                    {diets.map((d, index)=>(<option 
                    key={index}
                    value={d.name}>{d.name}</option>))}
                </select>                               
                {input.diets.map(el=>
                    <div>
                        <p className = {styles.error}>{el}</p>                        
                        <button onClick={(e)=> handleDelete(e)} className = {styles.buttonDelete}>x</button>
                    </div>)}                   
                    
                <button className = {styles.buttonCreate}>Create!</button>                
            </form> 
            <Link to='/home'><button className = {styles.button}>Back</button></Link>                       
        </div>
    )
}    