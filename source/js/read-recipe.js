window.addEventListener('DOMContentLoaded', init)
// read-recipe.js

  const recipeTitleElem = document.getElementById('recipeTitle')
  recipeTitleElem.innerText = recipe.title
let recipes = {};
window.addEventListener('DOMContentLoaded', init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  console.log('Initializing');
  initializeStorage();
  checkID();
}

/** Initializes recipes object from localStorage cache */
function initializeStorage() {
  // TODO: This is duplicated code from create-recipe.js
  console.log('Initializing recipes object');
  const json = localStorage.getItem('recipes');

  if (json === null) {
    console.log('Recipes not initialized in localStorage cache');
    // Good practice to use brackets to ensure proper type
    recipes['currID'] = 1;
    localStorage.setItem('recipes', JSON.stringify(recipes));
    return;
  }

  recipes = JSON.parse(json);
  if (Object.keys(recipes).length == 0) {
    console.log('Empty recipes object');
  }
}

/** Populate forms by ID
 * @param {int} id
*/
function populateHTML(id) {
  if (!(id in recipes)) {
    console.log(`ID: ${id} does not exist in recipes`);
    return;
  }
  const recipe = recipes[id];
  console.log(`Recipe: ${recipe['title']}`);

  document.getElementById('recipeTitle').innerText = recipe['title'];
  document.getElementById('recipeDescription').innerText =
      recipe['description'];

  const recipeIngredients = recipe['ingredients'];
  const ingredientElems = document.getElementById('ingredients').getElementsByClassName('ingredient');
  for (let i = 0; i < ingredientElems.length; i++) {
    const ingElem = ingredientElems[i];
    const recipeIng = recipeIngredients[i];
    ingElem.innerText = `${recipeIng['name']} Amount: ${recipeIng['amount']} Cost: ${recipeIng['cost']}`;
  }

  const recipeSteps = recipe['steps'];
  const stepElems = document.getElementById('instructions').getElementsByClassName('step-instruction');
  for (let i = 0; i < stepElems.length; i++) {
    const stepElem = stepElems[i];
    const recipeStep = recipeSteps[i];
    stepElem.querySelector('.card-subtitle').innerText = `Step ${i+1}`;
    stepElem.querySelector('.card-text').innerText = recipeStep;
  }


  /*
  const ingredients = [];
  recipe.ingredients = ingredients;
  const ingredient1 = {};
  ingredient1.name = document.getElementById('ingredient1name').value.trim();
  ingredient1.amount = document.getElementById('ingredient1amount')
      .value.trim();
  ingredients.push(ingredient1);
  const steps = [];
  recipe.steps = steps;
  document.getElementById('step1')
  document.getElementById('step2')
  */
}

/** Checks if ID is in localStorage */
function checkID() {
  const queryString = window.location.search;
  // console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  if (id === null) {
    console.log('No id parameter');
    return;
  }
  console.log(`id: ${id}`);
  populateHTML(id);
}