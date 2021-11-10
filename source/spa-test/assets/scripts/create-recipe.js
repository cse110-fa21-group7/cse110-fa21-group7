/**  Show a message in the invalid-feedback div below the input element
 * @param {HTMLElement} input
 * @param {String} message
 * @param {Boolean} type
 * @return {Boolean}
*/
function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector('div.invalid-feedback');
  console.log(msg);
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
    recipe.title = document.getElementById('recipeTitle').value.trim();
    const ingredients = [];
    recipe.ingredients = ingredients;
    const ingredient1 = {};
    ingredient1.name = document.getElementById('ingredient1name').value.trim();
    ingredient1.amount = document.getElementById('ingredient1amount')
        .value.trim();
    ingredients.push(ingredient1);
    const steps = [];
    recipe.steps = steps;
    steps.push(document.getElementById('step1').value.trim());
    console.log(document.getElementById('step2').value.trim());
    localStorage.setItem('recipe', JSON.stringify(recipe));
  }
});
