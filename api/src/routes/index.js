const { Router } = require('express');
// Importar todos los routers;

const recipe = require('./recipe.js');
const recipes = require('./recipes.js');
const diet = require('./diets.js');

const router = Router();

// Configurar los routers
router.use('/recipe', recipe);
router.use('/types', diet);
router.use('/recipes', recipes);


module.exports = router;
