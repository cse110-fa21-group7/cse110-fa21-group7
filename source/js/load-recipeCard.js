const recipeData = {};

window.addEventListener("DOMContentLoaded", init);
// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  const fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log("Recipe fetch unsuccessful");
    return;
  }
  // Add the first three recipe cards to the page
  createRecipeCards();
}

async function fetchRecipes() {
  const storage = window.localStorage;
  const recipes = JSON.parse(storage.getItem("recipes"));
  for (const [key, value] of Object.entries(recipes)) {
    if (key !== "currID") {
      recipeData[key] = value;
    }
  }
  console.log(recipeData);
  return true;
}

function createRecipeCards() {
  const main = document.querySelector(".recipe-cards--wrapper");
  // loop whole local storge
  for (const [key, value] of Object.entries(recipeData)) {
    const card = document.createElement("recipe-card");
    card.data = value;
    readRecipe(card, key);
    main.appendChild(card);
  }
}

function readRecipe(recipeCard, id) {
  recipeCard.addEventListener("click", (e) => {
    window.location.href =
      window.location.origin + "/source/html/read-recipe.html?id=" + id;
  });
}
