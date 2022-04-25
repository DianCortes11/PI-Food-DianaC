require('dotenv').config(); 
const { Router } = require("express");
const axios = require ('axios');
const {Recipe, Diet} = require ('../db')
const router = Router();
const {YOUR_API_KEY} = process.env;



//Traer la informacion de la API
const getApi = async () =>{
  const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)
  //console.log(apiUrl.data)
  const apiInfo = await apiUrl.data.results.map(el =>{
      return{
          id: el.id,                         
          name: el.title,
          image: el.image,
          score: el.spoonacularScore,            
          diets: el.diets,
          summary: el.summary,
          healthLevel: el.healthScore,
          steps: el.analyzedInstructions[0]?.steps
      };
      
  });
  return apiInfo;
};


//Traer/buscar informacion en la base de datos
const getDB = async () =>{
  return await Recipe.findAll({
      include: {
          model: Diet,
          attributes: ['name'],  
          through: {
              attributes: [],   
          },
      }
  })
}

//Traer toda la informacion completa de base de datos y de la API
const getAllrecipes = async ()=>{
const apInfo = await getApi();//informacion de la API
const dbInfo = await getDB(); //informacion de la base de datos
const infoTotal = [...apInfo, ...dbInfo]; //se concatena la informacion total
return infoTotal; //informacion total
};

//Traer las recetas por nombre
router.get('/', async (req, res)=>{
  const {name} = req.query
  const recipesTotal = await getAllrecipes()

  if (name) {
      let recipeName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      recipeName.length ?
          res.status(200).send(recipeName) :
          res.status(404).send("Recipe doesn't exist")
  } else {
      res.status(200).send(recipesTotal) 
  }
})

//Traer las receta por ID
router.get('/:id', async (req, res)=>{
  const {id} = req.params; //
  const recipesTotal = await getAllrecipes();

  if(id){        
      const recipeId = recipesTotal.filter(el=>el.id == id)
      recipeId.length?
      res.status(200).send(recipeId) :
      res.status(404).send('Recipe not found') 
  }
});
    
module.exports = router

   