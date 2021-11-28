const recipeData = {};
const userRecipes = JSON.parse(localStorage.getItem("userRecipes"));
const storedRecipes = JSON.parse(localStorage.getItem("storedRecipes"));
window.addEventListener("DOMContentLoaded", init);
// This is the first function to be called, so when you are tracing your code start here.
/**
 * Entry point
 * @return {null}
 */
async function init() {
  // fetch the recipes and wait for them to load
  const fetchSuccessful = fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log("Recipe fetch unsuccessful");
    return;
  }
  // Add the first three recipe cards to the page
  createRecipeCards();
}

/**
 * Get recipes from localStorage
 * @return {Boolean}
 */
async function fetchRecipes() {
  for (const [key, value] of Object.entries(userRecipes)) {
    if (key !== "currID") {
      recipeData[key] = value;
    }
  }
  return true;
}

/**
 * Create recipe cards
 */
function createRecipeCards() {
  const main = document.querySelector(".wrapper");
  // loop whole local storge
  for (const [key, value] of Object.entries(recipeData)) {
    const card = document.createElement("recipe-card");
    card.data = value;
    main.appendChild(card);
    readRecipe(card, key);
  }
}

/**
 * Add event listeners to recipe card elements
 * @param {HTMLElement} recipeCard
 * @param {String} id
 */
function readRecipe(recipeCard, id) {
  recipeCard.addEventListener("click", (e) => {
    const url = `/recipeDetails?id=${id}`;
    window.location.href = url;
  });
}
