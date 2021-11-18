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
  // load one example recipe card first:
  // const test = {id: "0", title: "test2", ingredients: [{name: "Ingredient 1", amount: "1"}], steps: ["Step 1"]};
  // recipeData['test'] = test;
  const example = {
        "id": 0,
        "img-url": "https://i.imgur.com/FJNLoj4.png",
        "title": "money2",
        "description": "apple",
        "totalCost": 2,
        "ingredients": [
            {
                "name": "apple",
                "amount": "100"
            },
            {
                "name": "beef",
                "amount": "5"
            },
            {
                "name": "egg",
                "amount": "2"
            }
        ],
        "steps": [
            "apple",
            "beef"
        ]
    };
  recipeData[0] = example;
  const storage = window.localStorage;
  const recipes = JSON.parse(storage.getItem("recipes"));
  const total = Number(recipes.currID);
  for (let i = 1; i < total; i++) {
    const id = i;
    const recipe = recipes[id];
    recipeData[id] = recipe;
  }
  return true;
}

function createRecipeCards() {
  const main = document.querySelector(".recipe-cards--wrapper");

  const total = Object.keys(recipeData).length;
  // load one example first:
  const cardExample = document.createElement("recipe-card");
  cardExample.data = recipeData[0];
  main.appendChild(cardExample);
  // loop whole local storge
  for (let i = 1; i < total; i++) {
    const card = document.createElement("recipe-card");
    card.data = recipeData[id];
    main.appendChild(card);
  }
}
