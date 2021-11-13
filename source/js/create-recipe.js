// create-recipe.js

let recipes = {};
window.addEventListener('DOMContentLoaded', init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  console.log('Initializing');
  initializeStorage();
  checkID();
}

/** Populate forms by ID
 * @param {int} id
*/
function populateForm(id) {
  if (id in recipes) {
    const recipe = recipes[id];
    console.log(recipe['title']);
  } else {
    console.log(`ID: ${id} does not exist in recipes`);
  }
  document.getElementById('recipeTitle').innerText = 'test';

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
  populateForm(id);
}

/** Initializes recipes object from localStorage cache */
function initializeStorage() {
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
    // Check properly formatted
    if (!('currID' in recipes)) {
      recipes['currID'] = 1;
    }
    console.log('Empty recipes object');
  }
}

/**  Show a message in the invalid-feedback div below the input element
 * @param {HTMLElement} input
 * @param {String} message
 * @param {Boolean} type
 * @return {Boolean}
*/
function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector('div.invalid-feedback');
  // console.log(msg);
  msg.innerText = message;
  // update the class for the input
  if (type) {
    // Valid
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    // Invalid
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }
  return type;
}

/** Shows error message
 * @param {HTMLElement} input
 * @param {String} message
 * @return {Function}
*/
function showError(input, message) {
  return showMessage(input, message, false);
}

/**
 * Shows success message
 * @param {HTMLElement} input
 * @return {Function}
 */
function showSuccess(input) {
  return showMessage(input, '', true);
}

/**
 * Checks if an element has a non-empty value
 * @param {HTMLElement} input
 * @param {String} message
 * @return {Function}
 */
function hasValue(input, message) {
  if (input.value.trim() === '') {
    return showError(input, message);
  }
  return showSuccess(input);
}

/*
function getElementIfExists(elem) {
  if (elem != null && elem.value.trim() === '') {
    return ''
  }
  return elem.value.trim()
}
*/

const form = document.getElementById('recipeForm');

const TITLE_REQUIRED = 'Please enter your recipe title';
const INGREDIENT_NAME_REQUIRED = 'Please enter your ingredient name';
const INGREDIENT_AMOUNT_REQUIRED = 'Please enter your ingredient amount';
const STEP_REQUIRED = 'Please enter your recipe instructions';

form.addEventListener('submit', function(event) {
  // stop form submission
  event.preventDefault();

  // validate form
  const titleValid = hasValue(document.getElementById('recipeTitle'),
      TITLE_REQUIRED);
  const ingredient1NameValid = hasValue(
      document.getElementById('ingredient1name'),
      INGREDIENT_NAME_REQUIRED);
  const ingredient1AmountValid = hasValue(
      document.getElementById('ingredient1amount'),
      INGREDIENT_AMOUNT_REQUIRED);
  const step1Valid = hasValue(document.getElementById('step1'), STEP_REQUIRED);

  // if valid, submit the form.
  if (titleValid &&
        ingredient1NameValid &&
        ingredient1AmountValid &&
        step1Valid) {
    const recipe = {};
    recipe['title'] = document.getElementById('recipeTitle').value.trim();
    recipe['description'] = document.getElementById('recipeDescription')
        .value.trim();
    const ingredients = [];
    const ingredientElems = document.getElementById('ingredients')
        .getElementsByClassName('form-group');
    for (let i = 0; i < ingredientElems.length; i++) {
      const ingElem = ingredientElems[i];
      const recipeIng = {};
      recipeIng['name'] = ingElem.getElementByClassName('ingredient-name')
          .value.trim();
      recipeIng['amount'] = ingElem.getElementByClassName('ingredient-amount')
          .value.trim();
      recipeIng['cost'] = ingElem.getElementByClassName('ingredient-amount')
          .value.trim();
      ingredients.push(recipeIng);
    }
    const steps = [];
    recipe.steps = steps;
    steps.push(document.getElementById('step1').value.trim());
    console.log(document.getElementById('step2').value.trim());

    const id = parseInt(recipes.currID, 10);
    recipes.currID = id + 1;

    recipes[id] = recipe;
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }
});
