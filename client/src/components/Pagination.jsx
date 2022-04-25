import React from "react";
import styles from './Pagination.module.css';

export default function Paginado({recipesPerPage, allRecipes, pagination}){
    const pageNumbers = []

    for(var i = 0; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                {pageNumbers && pageNumbers.map(number=>(
                    <li key={number} className={styles.li}>
                    <button className={styles.button}onClick={()=>pagination(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}