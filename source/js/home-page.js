import { asapInit } from "./init.js";
import { fetchFullRecipe } from "./search-recipe.js";
window.addEventListener("DOMContentLoaded", init);
let recipeObject;
let page;
let userRecipe;

/** Initialize function, begins all of the JS code in this file */
async function init() {
  await asapInit(); // wait for init local storage
  userRecipe = JSON.parse(localStorage.getItem("userRecipes"));
  makePage();
  recipeCards(recipeObject);
  addSortListener();
}

/**
 * make page depends on what page you want to show
 */
function makePage() {
  const queryString = window.location.href;
  console.log(queryString);
  // default is home page is the curated recipes section
  page = "curatedList";
  const intro = document.querySelector(".search-introduction");
  intro.innerHTML = "Search and save your favorite recipes.";
  // all sections we need to deal with
  // const secitonList = ["search", "cookbook", "results", "curatedList"];
  let showList = ["search", "curatedList"]; // seciton list we want to show
  let hideList = ["cookbook", "cookbook-sort", "results"]; // section lsit we want to hide
  // switch recipeObject depends on which page we want to show
  recipeObject = JSON.parse(localStorage.getItem("curatedRecipes"));
  // change all variables depends on current page
  // if we want to show cookbook, the recipeObject should be userRecipes which saved in localStorge
  if (queryString.includes("cookbook")) {
    page = "cookbook";
    intro.innerHTML = "Here are your recipes.";
    showList = ["cookbook", "cookbook-sort"];
    // only cookbook need to hide the whole recipe-card-container
    hideList = ["search", "results", "curatedList"];
    recipeObject = userRecipe;
  } else if (queryString.includes("result")) {
    page = "results";
    showList = ["search", "results"];
    hideList = ["curatedList"];
    console.log("result");
    recipeObject = JSON.parse(localStorage.getItem("resultRecipes"));
  }
  recipeObject = dictToArr(recipeObject);
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
 * @param {Array} recipeObject
 */
function recipeCards(recipeObject) {
  const section = document.querySelector(`.${page}`);

  // generate 8 random recipe cards
  const randomArray = [];
  if (page == "curatedList") {
    const total = Object.keys(recipeObject).length;
    const array = [];
    for (let i = 0; i < total; i++) {
      array.push(i);
    }
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      const randomNumber = array[randomIndex];
      array.splice(randomIndex, 1);
      randomArray.push(randomNumber);
    }
    console.log(randomArray);
    randomArray.forEach((e) => {
      const key = recipeObject[e][0];
      const value = recipeObject[e][1];
      const card = document.createElement("recipe-card");
      card.setPage(page);
      card.setRecipes(userRecipe);
      card.setID(key);
      card.data = value;
      section.appendChild(card);
      toReadRecipe(card, key);
    });
  } else {
    // Loop through recipeObject array
    recipeObject.forEach((e) => {
      const key = e[0];
      const value = e[1];
      if (key === "currID") return;
      const card = document.createElement("recipe-card");
      card.setPage(page);
      card.setRecipes(userRecipe);
      card.setID(key);
      card.data = value;
      section.appendChild(card);
      toReadRecipe(card, key);
    });
  }
}

/**
 * Add event listeners to recipe card elements
 * @param {HTMLElement} recipeCard
 * @param {String} id
 */
function toReadRecipe(recipeCard, id) {
  recipeCard.addEventListener("click", (e) => {
    let url = `/read/fetchID?id=${id}`;
    if (page === "curatedList") {
      if (recipeCard.flag) addToCookbook(recipeCard, id);
      else {
        if (id in userRecipe) url = `/read/bookID?id=${id}`;
        window.location.href = url;
      }
    } else if (page === "cookbook") {
      url = `/read/bookID?id=${id}`;
      window.location.href = url;
    } else if (page === "results") {
      fetchFullRecipe(id).then(() => {
        // when user want to add current recipe to cookbook by using add btn on recipe card
        if (recipeCard.flag) addToCookbook(recipeCard, id);
        else window.location.href = url;
      });
    }
  });
}
/**
 * Add current recipe to cookbook
 * @param {HTMLElement} recipeCard
 * @param {String} id
 */
function addToCookbook(recipeCard, id) {
  const storedRecipes = JSON.parse(localStorage.getItem("storedRecipes"));
  userRecipe[id] = storedRecipes[id];
  localStorage.setItem("userRecipes", JSON.stringify(userRecipe));
  recipeCard.flag = false;
}
/**
 * Sorts recipes in localStorageKey
 * Sorts on recipeValue (e.g. totalCost)
 * ascending or descending
 * @param {Boolean} ascending
 * @param {String} localStorageKey
 * @param {String} recipeValue
 * @return {Array}
 */
function sortRecipes(ascending, localStorageKey, recipeValue) {
  console.log("sortRecipes");
  const userRecipes = JSON.parse(localStorage.getItem(localStorageKey));
  // console.log(userRecipes);
  // Create array of recipe objects
  const recipes = Object.keys(userRecipes).map(function (key) {
    return [key, userRecipes[key]];
  });

  console.log("before sort");
  recipes.forEach(function (element) {
    console.log(`${element[0]} ${element[1][recipeValue]}`);
  });

  // Sort based on second element's totalCost value
  if (ascending) {
    recipes.sort(function (first, second) {
      const firstCost = parseFloat(first[1][recipeValue]);
      const secondCost = parseFloat(second[1][recipeValue]);
      console.log(`first: ${firstCost}, second: ${secondCost}`);
      return firstCost - secondCost;
    });
  } else {
    recipes.sort(function (first, second) {
      const firstCost = parseFloat(first[1][recipeValue]);
      const secondCost = parseFloat(second[1][recipeValue]);
      console.log(`first: ${firstCost}, second: ${secondCost}`);
      return secondCost - firstCost;
    });
  }

  console.log("after sort");
  recipes.forEach(function (element) {
    console.log(`${element[0]} ${element[1][recipeValue]}`);
  });

  return recipes;
}

/**
 * Sort listener
 */
function addSortListener() {
  const sortSelect = document.getElementById("sort-direction");
  sortSelect.addEventListener("change", (e) => {
    const ascending = sortSelect.value == "Ascending";
    // console.log(`Sorting by ascending: ${ascending}`);
    recipeObject = sortRecipes(ascending, "userRecipes", "totalCost");
    clearRecipeCards("cookbook");
    recipeCards(recipeObject);
  });
}

/**
 * Helper function, deletes recipeCards from page section for refresh
 * @param {String} page
 */
function clearRecipeCards(page) {
  const section = document.querySelector(`.${page}`);

  // Clear unfilled elements
  const sectionRecipeCards = section.getElementsByTagName("recipe-card");
  while (sectionRecipeCards.length > 0) {
    sectionRecipeCards[0].remove();
  }
}

/**
 * Helper function, converts dictionary to array of [key, value] pairs
 * @param {Object} dict
 * @return {Array}
 */
function dictToArr(dict) {
  const arr = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });
  return arr;
}
