import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/actions";
import { useEffect } from "react";
import styles from './Detail.module.css';

export default function Detail(){
  const {id} = useParams()
  const dispatch = useDispatch() 
  useEffect (() => {dispatch(getDetail(id))} ,[]) // eslint-disable-line
  const detailstate = useSelector((state) => state.detail)
  console.log(detailstate[0]);
        
    return(
      <div>
     { 
       detailstate.length > 0 ? 
       
       <div className = {styles.container}> 
           <h1 className = {styles.title}> {detailstate[0].name} </h1>
           <h5 className = {styles.diets}>Diets: {detailstate[0].diets + ","}</h5>
           <div className = {styles.innercontainer}>
           <h3 className = {styles.info}>HealthLevel: {detailstate[0].healthLevel}</h3>
           <h3 className = {styles.info}>Score: {detailstate[0].score}</h3>
           </div>
           <h3 className = {styles.subtitles}>Summary:</h3>
           <p className = {styles.p}><img src={detailstate[0].image} alt = 'dish' className = {styles.img}/>{detailstate[0].summary}</p>
           <h3 className = {styles.subtitles}>Steps:</h3><p className = {styles.p}>{ Array.isArray(detailstate[0].steps) ? detailstate[0].steps.map(e => <li>{e.step}</li>) : detailstate[0].steps }</p>
           <Link to='/home'><button className = {styles.button}>Back to Home </button> </Link>
       </div> : 
       
       <div> <h2> loading... </h2> </div>
      }
     </div>
         )
     
     }           
             