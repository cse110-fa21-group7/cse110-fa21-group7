// read-recipe.js

// const recipeTitleElem = document.getElementById("recipeTitle");
// recipeTitleElem.innerText = recipe.title;
let recipes = {};
window.addEventListener("DOMContentLoaded", init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  console.log("Initializing");
  initializeStorage();
  checkID();
}

/** Initializes recipes object from localStorage cache */
function initializeStorage() {
  // TODO: This is duplicated code from create-recipe.js
  console.log("Initializing recipes object");
  const json = localStorage.getItem("recipes");

  if (json === null) {
    console.log("Recipes not initialized in localStorage cache");
    // Good practice to use brackets to ensure proper type
    recipes["currID"] = 1;
    localStorage.setItem("recipes", JSON.stringify(recipes));
    return;
  }

  recipes = JSON.parse(json);
  if (Object.keys(recipes).length == 0) {
    console.log("Empty recipes object");
  }
}

/** Checks if ID is in localStorage */
function checkID() {
  const queryString = window.location.search;
  // console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  if (id === null) {
    console.log("No id parameter");
    return;
  }
  console.log(`id: ${id}`);
  populateHTML(id);
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
  console.log(`Recipe: ${recipe["title"]}`);

  document.getElementById("recipeTitle").innerText = recipe["title"];
  document.getElementById("recipeDescription").innerText =
    recipe["description"];
  
  const recipeDiv = document.getElementById('recipe');
  const img = recipeDiv.querySelector('img');
  img.src = recipe['img-url'];
  
  const ingList = document.getElementById('ingredients');
  const ingElems = ingList.getElementsByTagName('li');
  const ingTemplate = ingElems[0].cloneNode(true);

  // Clear filler elements
  
  while (ingElems.length > 0) {
    console.log('removing');
    ingElems[0].remove();
  }
  

  // Create new list elements
  const recipeIngredients = recipe["ingredients"];
  for (let i = 0; i < recipeIngredients.length; i++) {
    const ingElem = ingTemplate.cloneNode(true); 
    ingElem.innerText = `${recipeIngredients[i]['name']} ${recipeIngredients[i]['amount']}`;
    ingList.appendChild(ingElem);
  }

  const stepsDiv = document.getElementById('steps');
  const stepElems = stepsDiv.getElementsByClassName('step-instruction');
  const stepTemplate = stepElems[0].cloneNode(true);

  // Clear filler elements 
  
  while (stepElems.length > 0) {
    console.log('removing');
    stepElems[0].remove();
  }
  

  // Create new step elements
  const recipeSteps = recipe['steps'];
  for (let i = 0; i < recipeSteps.length; i++) {
    const stepElem = stepTemplate.cloneNode(true);
    stepElem.querySelector('.card-subtitle').innerText = `Step ${i+1}`;
    stepElem.querySelector('.card-text').innerText = recipeSteps[i];
    stepsDiv.appendChild(stepElem);
  }
}


