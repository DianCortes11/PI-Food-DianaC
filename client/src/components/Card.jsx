import React from "react";
import styles from './Card.module.css'

export default function Card({img, name, diets}){
    return(
        <div className={styles.container}>
            <h2 className={styles.h2}>{name}</h2>
            {diets?.map(e=> <h4 className={styles.h4} key={e} style={{ display: "inline" }}>{e + ", "}</h4>)}
            <img className={styles.img}src= {img} alt='img'></img>                          
        </div>
    );
}