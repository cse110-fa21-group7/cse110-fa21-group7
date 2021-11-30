import { init } from "./init.js";
// import { populateRead } from "./read-recipe.js";
window.addEventListener("DOMContentLoaded", currInit);
let recipeObject;
let page;
/** Initialize function, begins all of the JS code in this file */
async function currInit() {
  await init(); // wait for init local storage
  makePage();
  recipeCards();
}

/**
 * make page depends on what page you want to show
 */
function makePage() {
  const queryString = window.location.href;
  console.log(queryString);
  // default is home page is the curated recipes section
  page = "curatedList";
  // all sections we need to deal with
  // const secitonList = ["search", "cookbook", "results", "curatedList"];
  let showList = ["search", "curatedList"]; // seciton list we want to show
  let hideList = ["cookbook", "results"]; // section lsit we want to hide
  // switch recipeObject depends on which page we want to show
  recipeObject = JSON.parse(localStorage.getItem("curatedRecipes"));
  // change all variables depends on current page
  // if we want to show cookbook, the recipeObject should be userRecipes which saved in localStorge
  if (queryString.includes("cookbook")) {
    page = "cookbook";
    showList = ["cookbook"];
    // only cookbook need to hide the whole recipe-card-container
    hideList = ["search", "results", "curatedList"];
    recipeObject = JSON.parse(localStorage.getItem("userRecipes"));
  } else if (queryString.includes("result")) {
    page = "results";
    showList = ["search", "results"];
    hideList = ["curatedList"];
    console.log("result");
    recipeObject = JSON.parse(localStorage.getItem("resultRecipes"));
  }
  // all cards need to show this container
  document.querySelector(".recipe-card-container").classList.add("shown");
  for (const show of showList) {
    const ele = document.querySelector(`.${show}`);
    if (!ele.classList.contains("shown")) ele.classList.add("shown");
  }
  for (const hide of hideList) {
    const ele = document.querySelector(`.${hide}`);
    if (ele.classList.contains("shown")) ele.classList.remove("shown");
  }
}

/**
 * Use recipeObject to create recipe cards
 */
function recipeCards() {
  console.log(`recipeCards: ${page}`);
  const section = document.querySelector(`.${page}`);
  // loop whole local storge
  console.log(recipeObject);
  for (const [key, value] of Object.entries(recipeObject)) {
    if (key === "currID") continue;
    const card = document.createElement("recipe-card");
    card.setPage(page);
    card.data = value;
    section.appendChild(card);
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
    let url = `/read/fetchID?id=${id}`;
    if (page === "curatedList") {
      // alert("readRecipe curatedList preview");
      window.location.href = url;
    } else if (page === "cookbook") {
      url = `/read/bookID?id=${id}`;
      window.location.href = url;
    } else if (page === "results") {
      // export preview-recipe.js fetchFullRecipe function
      // after function back, recipe info should saved in storedRecipes
      // then we can use read-recipe.js to read recipe details
      fetchFullRecipe(id).then(()=>{
        window.location.href = url;
      });
      // alert('readRecipe results page');
    }
  });
}




/**
 * Gets full recipe from Spoonacular API based on ID
 * @param {String} id
 * @return {Object}
 */
 async function fetchFullRecipe(id) {
  const storedRecipes = JSON.parse(localStorage.getItem("storedRecipes"));
  if (id in storedRecipes) {
    return;
  } else {
    console.log("Fetching full recipe");
    const url = `/search/recipeId?id=${id}`;
    // Return the recipe object from spoonacular
    const res = await fetch(url); 
    console.log(res);
    const data = await res.json();
    if (data.cod === "404") {
      alert("Recipe not found");
      return null;
    }
    if (data.cod === 401) {
      alert("Invalid API Key");
      return null;
    }
    console.log(`Recipe:\n${data}`);
    storedRecipes[id] = spoonToASAP(data);
    localStorage.setItem("storedRecipes", JSON.stringify(storedRecipes));
  }
}

/**
 * Converts Spoonacular recipe object into ASAP recipe object
 * @param {Object} data 
 * @return {Object}
 */
function spoonToASAP(data) {
  console.log('SpoonToASAP');
  console.log(data);
  const asap = {};
  asap["title"] = data["title"];
  asap["description"] = removeTags(data["summary"]).substring(0, 300) + "...";
  asap["servings"] = data["servings"];
  asap["totalCost"] = (parseFloat(data["pricePerServing"]) / 100).toFixed(2);
  asap["time"] = data["readyInMinutes"];
  asap["image"] = data["image"];

  const ingredients = [];
  for (const dataIng of data["extendedIngredients"]) {
    const ingredient = {};
    ingredient["name"] = dataIng["name"];
    ingredient["amount"] = dataIng["measures"]["us"]["amount"] + " " + dataIng["measures"]["us"]["unitShort"];
    ingredients.push(ingredient);
  }
  asap["ingredients"] = ingredients;

  const steps = [];
  for (const dataStep of data["analyzedInstructions"][0]["steps"]) {
    const step = dataStep["step"];
    steps.push(step);
  }
  asap["steps"] = steps;

  return asap;
}

/**
 * Helper function, removes HTML tags from recipe summary
 * @param {String} str
 * @return {String}
 */
 function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}

// this is recipe read page, need to convert to SPA
// if (queryString.includes("read")) {
//   const cardContainer = document.querySelector(".recipe-card-container");
//   if (cardContainer.classList.contains("shown"))
//     cardContainer.classList.remove("shown");
//   // recipe read need to hide recipe-read-container
//   const readContainer = document.querySelector(".recipe-read-container");
//   if (!readContainer.classList.contains("shown"))
//     readContainer.classList.add("shown");
//     populateRead();
//   return;
// }

// hide sections
// const cardContainer = document.querySelector(".recipe-card-container");
// cardContainer.classList.add("shown");
// if (!cardContainer.classList.contains("shown"))
// cardContainer.classList.add("shown");
// // recipe read need to hide recipe-read-container
// const readContainer = document.querySelector(".recipe-read-container");
// if (readContainer.classList.contains("shown"))
// readContainer.classList.remove("shown");
