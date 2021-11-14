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
    for(let i=0;i<10;i++){
      let name = "test"+i;
      let test = {title: name, ingredients: [{name: "Ingredient 1", amount: "1"}], steps: ["Step 1"]}
      recipeData[name] = test;
      // let test2 = {title: "test2", ingredients: [{name: "Ingredient 1", amount: "1"}], steps: ["Step 1"]}
      // recipeData['test2'] = test2;
      // let test3 = {title: "test3", ingredients: [{name: "Ingredient 1", amount: "1"}], steps: ["Step 1"]}
      // recipeData['test3'] = test3;
    }
    return true;
}


function createRecipeCards() {
    let main = document.querySelector('.recipe-cards--wrapper');
    console.log(main);

    for(let i=0;i<10;i++){
      let card = document.createElement('recipe-card');
      let name = "test"+i;
      card.data = recipeData[name];
      main.appendChild(card)
    }
  }
