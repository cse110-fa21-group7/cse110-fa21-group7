// create-recipe.js

let recipes = {};
window.addEventListener('DOMContentLoaded', init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  console.log('Initializing');
  initializeStorage();
  checkID();
  setFormListener();
}

// TODO: Finish populateForm
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

/**
 * Checks if an element has a float value
 * @param {HTMLElement} input
 * @param {String} message
 * @return {Function}
 */
function hasFloat(input, message) {
  if (isNaN(parseFloat(input.value.trim()))) {
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

/**
 * Set up form event listener
 */
function setFormListener() {
  const form = document.getElementById('recipeForm');

  const TITLE_REQUIRED = 'Please enter your recipe title';
  const INGREDIENT_NAME_REQUIRED = 'Please enter your ingredient name';
  const INGREDIENT_AMOUNT_REQUIRED = 'Please enter your ingredient amount';
  const STEP_REQUIRED = 'Please enter your recipe instructions';

  form.addEventListener('submit', function(event) {
    // Stop form submission
    event.preventDefault();
    console.log('Submit button clicked');
    let allValid = true;
    const recipe = {};

    // Validate form
    const titleValid = hasValue(document.getElementById('recipeTitle'),
        TITLE_REQUIRED);
    if (titleValid) {
      recipe['title'] = document.getElementById('recipeTitle').value.trim();
    } else {
      allValid = false;
    }

    recipe['description'] = document.getElementById('recipeDescription')
        .value.trim();

    const totalCost = document.getElementById('recipeCost')
        .value.trim();
    let cost = null;
    if (totalCost.length > 0) {
      if (hasFloat(document.getElementById('recipeCost'))) {
        cost = parseFloat(totalCost);
      } else {
        allValid = false;
      }
    }
    recipe['totalCost'] = cost;

    // TODO: Upload Image

    const ingredients = [];
    const ingredientElems = document.getElementById('ingredients')
        .getElementsByClassName('ingredient');
    for (let i = 0; i < ingredientElems.length; i++) {
      const ingElem = ingredientElems[i];
      const recipeIng = {};
      const ingredientNameValid = hasValue(
          ingElem.querySelector('.ingredient-name > input'),
          INGREDIENT_NAME_REQUIRED);
      const ingredientAmountValid = hasValue(
          ingElem.querySelector('.ingredient-amount > input'),
          INGREDIENT_AMOUNT_REQUIRED);
      recipeIng['name'] = ingElem.querySelector('.ingredient-name > input')
          .value.trim();
      recipeIng['amount'] = ingElem.querySelector('.ingredient-amount > input')
          .value.trim();


      if (ingredientNameValid && ingredientAmountValid) {
        ingredients.push(recipeIng);
      } else {
        allValid = false;
      }
    }

    recipe['ingredients'] = ingredients;

    const steps = [];
    const stepElems = document.getElementById('steps')
        .getElementsByClassName('step-sec');
    for (let i = 0; i < stepElems.length; i++) {
      const stepElem = stepElems[i];
      console.log(`stepElem: ${stepElem}`);
      const stepValid = hasValue(
          stepElem.querySelector('.form-control'), STEP_REQUIRED);
      if (stepValid) {
        const step = stepElem.querySelector('.form-control').value.trim();
        steps.push(step);
      } else {
        allValid = false;
      }
    }
    recipe['steps'] = steps;

    if (allValid) {
      const id = parseInt(recipes.currID, 10);
      recipes.currID = id + 1;

      recipes[id] = recipe;
      localStorage.setItem('recipes', JSON.stringify(recipes));
    } else {
      console.log('Invalid recipe');
    }
  });
}

