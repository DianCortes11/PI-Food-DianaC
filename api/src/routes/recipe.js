const express = require('express')
const router = express.Router()
const { Recipe, Diet } = require('../db');

router.post('/', async (req, res)=>{
    const { name, summary, score, healthLevel, steps, diets, image } = req.body;
    const recipeCreated = await Recipe.create({
        name,
        summary,
        score,
        healthLevel,
        steps,
        image,
    });
    const dietsDb = await Diet.findAll({where: {name: diets}})  
    
    recipeCreated.addDiet(dietsDb)
    res.send('Recipe created successfully')
})
module.exports = router