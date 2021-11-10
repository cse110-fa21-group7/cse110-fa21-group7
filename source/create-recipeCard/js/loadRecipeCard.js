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
    let test = {title: "test", ingredients: [{name: "Ingredient 1", amount: "1"}], steps: ["Step 1"]}
    recipeData['test'] = test
    return true;
}


function createRecipeCards() {
    let main = document.querySelector('.recipe-cards--wrapper');
    console.log(main);
    let card = document.createElement('recipe-card');
    card.data = recipeData['test'];
    main.appendChild(card)
}

