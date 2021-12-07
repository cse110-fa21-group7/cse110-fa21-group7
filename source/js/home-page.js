import { asapInit } from "./init.js";
import { fetchRecipes, fetchFullRecipe } from "./search-recipe.js";
window.addEventListener("DOMContentLoaded", init);
let recipeObject;
let page;
let userRecipe;

/** Initialize function, begins all of the JS code in this file */
async function init() {
  await asapInit(); // wait for init local storage
  userRecipe = JSON.parse(localStorage.getItem("userRecipes"));
  makePage();
  addSortListener();
}

/**
 * make page depends on what page you want to show
 */
function makePage() {
  const queryString = window.location.href;
  console.log(queryString);
  const intro = document.querySelector(".search-introduction");
  // all sections we need to deal with
  // const secitonList = ["search", "cookbook", "results", "curatedList"];
  let showList; // seciton list we want to show
  let hideList; // section lsit we want to hide
  // change all variables depends on current page
  // change navbar in-active
  const homeAvtive = document.querySelector("#home-active");
  const bookActive = document.querySelector("#book-active");
  if (queryString.includes("cookbook")) {
    // navbar show cookBook in-active
    bookActive.classList.add("is-active");
    page = "cookbook";
    intro.innerHTML = "Here are your recipes.";
    showList = ["cookbook", "cookbook-sort"];
    // only cookbook need to hide the whole recipe-card-container
    hideList = ["search", "results", "curatedList", "more"];
    // if we want to show cookbook, the recipeObject should be userRecipes which saved in localStorge
    recipeObject = userRecipe;
  } else if (queryString.includes("result")) {
    page = "results";
    showList = ["search", "results", "more"];
    hideList = ["curatedList"];
    recipeObject = JSON.parse(localStorage.getItem("resultRecipes"));
  }
  // else means user in home page
  else {
    intro.innerHTML = "Search and save your favorite recipes.";
    page = "curatedList";
    homeAvtive.classList.add("is-active"); // navbar show home-page in-active
    showList = ["search", "curatedList", "more"];
    hideList = ["cookbook", "cookbook-sort", "results"];
    // switch recipeObject depends on which page we want to show
    // recipeObject = JSON.parse(localStorage.getItem("curatedRecipes"));
    recipeObject = JSON.parse(localStorage.getItem("curatedRecipes"));
    if (recipeObject === null) createCaurtedList();
  }
  recipeObject = dictToArr(recipeObject);
  // all cards need to show this container
  document.querySelector(".recipe-card-container").classList.add("shown");
  // 2 for loops 1 is for show sections, and 1 is for hide some sections
  for (const show of showList) {
    const ele = document.querySelector(`.${show}`);
    if (!ele.classList.contains("shown")) ele.classList.add("shown");
  }
  for (const hide of hideList) {
    const ele = document.querySelector(`.${hide}`);
    if (ele.classList.contains("shown")) ele.classList.remove("shown");
  }
  recipeCards();
}

/**
 * Use recipeObject to create recipe cards
 */
function recipeCards() {
  console.log(`${page}`);
  console.log(recipeObject);
  const section = document.querySelector(`.${page}`);
  // Loop through recipeObject array
  recipeObject.forEach((e) => {
    const key = e[0];
    const value = e[1];
    const card = document.createElement("recipe-card");
    card.setPage(page);
    card.setRecipes(userRecipe);
    card.setID(key);
    card.data = value;
    section.appendChild(card);
    toReadRecipe(card, key);
  });
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

/**
 * Helper function, gave back 8 random numbers from 30 numbers
 * @param {Number} total
 * @return {Array}
 */
function getRandom(total) {
  const randomArray = [];
  const array = [];
  for (let i = 1; i <= total; i++) {
    array.push(i);
  }
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomNumber = array[randomIndex];
    array.splice(randomIndex, 1);
    randomArray.push(randomNumber);
  }
  return randomArray;
}
/**
 * Helper function, gave back 8 random numbers from 30 numbers
 * @return {Dictionary}
 */
function createCaurtedList() {
  const randomArray = getRandom(31);
  console.log(randomArray);
  const tempStored = JSON.parse(localStorage.getItem("storedRecipes"));
  const returnRecipes = {};
  randomArray.forEach((e) => {
    returnRecipes[e] = tempStored[e];
  });
  recipeObject = dictToArr(returnRecipes);
  localStorage.setItem("curatedRecipes", JSON.stringify(returnRecipes));
  // return returnRecipes;
}

const moreRcipes = document.querySelector("#more-recipes");
moreRcipes.addEventListener("click", () => {
  if (page === "curatedList") {
    removeElements(document.querySelectorAll(".card"));
    createCaurtedList();
    recipeCards();
  }
  if (page === "results") {
    const url = localStorage.getItem("query");
    console.log(`${url}&offset=12`);
    fetchRecipes(true, `${url}&offset=100`).then(() => {
      removeElements(document.querySelectorAll(".card"));
      recipeObject = JSON.parse(localStorage.getItem("resultRecipes"));
      recipeObject = dictToArr(recipeObject);
      recipeCards();
    });
  }
});
//  remove all elements have same class name
const removeElements = (elms) => elms.forEach((el) => el.remove());
// Use like:
