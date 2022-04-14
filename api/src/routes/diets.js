require('dotenv').config();
const express = require('express')
const router = express.Router()
const { Diet } = require('../db');
const axios = require ('axios');
const {YOUR_API_KEY} = process.env;

router.get('/', async (req, res) => {
    const dietsApi= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)
    let diets = []
    dietsApi.data.results.forEach(el=> diets.push(...el.diets))
    diets = [...new Set(diets)] //configura y describe como se tiene q guardar la info en db
          

    diets.forEach(el => {
        Diet.findOrCreate({ 
            where: { name: el }
        })
    })

    const allDiets = await Diet.findAll({
        attributes:['name']
    })
    res.send(allDiets)
})

module.exports = router