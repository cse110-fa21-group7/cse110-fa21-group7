// Recipe object format: 
// {
//     "title": "test",
//     "ingredients": [
//       {
//         "name": "Ingredient 1",
//         "amount": "1"
//       }
//     ],
//     "steps": [
//       "Step 1"
//     ]
// }




const recipeData = {}


window.addEventListener('DOMContentLoaded', init);
// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
}


async function fetchRecipes() {
    const storage = window.localStorage;
    const recipes = JSON.parse(storage.getItem('recipes'));
    const total = Number(recipes.currID);
    for(let i = 1; i < total; i++){
      let id = i;
      let recipe = recipes[id];
      recipeData[id] = recipe;
      // let test2 = {title: "test2", ingredients: [{name: "Ingredient 1", amount: "1"}], steps: ["Step 1"]}
      // recipeData['test2'] = test2;
      // let test3 = {title: "test3", ingredients: [{name: "Ingredient 1", amount: "1"}], steps: ["Step 1"]}
      // recipeData['test3'] = test3;
    }
    return true;
}


function createRecipeCards() {
    let main = document.querySelector('.recipe-cards--wrapper');

    const total = Object.keys(recipeData).length;

    for(let i = 0; i < total; i++){
      let card = document.createElement('recipe-card');
      let id = i + 1;
      card.data = recipeData[id];
      main.appendChild(card)
    }
  }
