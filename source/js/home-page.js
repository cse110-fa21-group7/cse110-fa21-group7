import { asapInit } from "./init.js";
import { fetchRecipes, fetchFullRecipe } from "./search-recipe.js";

window.addEventListener("DOMContentLoaded", init);

const NUM_CURATED_RECIPES = 12;
const NUM_TOTAL_CURATED_RECIPES = 46;

let recipeObject;
let page;
let userRecipe;

/** Initialize function, begins all of the JS code in this file */
async function init() {
  await asapInit(); // wait for init local storage
  userRecipe = JSON.parse(localStorage.getItem("userRecipes"));
  const previousPage = document.querySelector("#previous");
  const nextPage = document.querySelector("#next");
  makePage(previousPage);
  addSortListener();
  pageBtn(previousPage, nextPage);
}

/**
 * make page depends on what page you want to show
 * @param {HTMLElement} previousPage
 */
function makePage(previousPage) {
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
  const baseInfo = document.querySelector("#base-info");
  const moreInfo = document.querySelector("#more-info");
  if (queryString.includes("cookbook")) {
    // navbar show cookBook in-active
    bookActive.classList.add("is-active");
    page = "cookbook";
    intro.innerHTML = "Your favorite recipes";
    showList = ["cookbook", "cookbook-sort"];
    // only cookbook need to hide the whole recipe-card-container
    hideList = ["search", "results", "curatedList", "more", "wrapper-info"];
    // if we want to show cookbook, the recipeObject should be userRecipes which saved in localStorge
    recipeObject = userRecipe;
  } else if (queryString.includes("result")) {
    page = "results";
    // tell the user the result information
    const query = localStorage.getItem("query");
    const urlParams = new URLSearchParams(query);
    baseInfo.innerHTML = `Recipes for ${urlParams.get("query")}`;
    // search filter:
    console.log(urlParams.get("diet"));
    let filter = `<i class="fa fa-filter fa-lg" aria-hidden="true"></i>`;
    if (urlParams.get("diet") && urlParams.get("diet") !== "")
      // filter += `< Diet: ${urlParams.get("diet")} >   `;
      filter += `<button class="diet-filter filter-btn">${urlParams.get(
        "diet"
      )}</button>`;
    console.log(filter);
    if (urlParams.get("meal"))
      filter += `<button class="meal-filter filter-btn">${urlParams.get(
        "meal"
      )}</button>`;
    if (urlParams.get("intoler") !== "")
      filter += `<button class="tol-filter filter-btn">${urlParams.get(
        "intoler"
      )}</button>`;
    moreInfo.innerHTML = `${filter}`;
    showList = ["search", "results", "more", "wrapper-info"];
    hideList = ["curatedList"];
    recipeObject = JSON.parse(localStorage.getItem("resultRecipes"));
    const offset = parseInt(localStorage.getItem("offset"));
    if (offset === 0) previousPage.style.display = "none";
    else previousPage.style.display = "block";
  }
  // else means user in home page
  else {
    intro.innerHTML = "Search and save your favorite recipes";
    page = "curatedList";
    homeAvtive.classList.add("is-active"); // navbar show home-page in-active
    showList = ["search", "curatedList", "wrapper-info"];
    hideList = ["cookbook", "cookbook-sort", "results", "more"];
    recipeObject = createCaurtedList();
    // switch recipeObject depends on which page we want to show
    // recipeObject = JSON.parse(localStorage.getItem("curatedRecipes"));
    // recipeObject = JSON.parse(localStorage.getItem("curatedRecipes"));
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
      // when user click recipe card add button or not
      if (recipeCard.flag) addToCookbook(recipeCard, id);
      else {
        // if current recipe is already in user cookbook.
        if (id in userRecipe) url = `/read/bookID?id=${id}`;
        window.location.href = url;
      }
    } else if (page === "cookbook") {
      url = `/read/bookID?id=${id}`;
      window.location.href = url;
    } else if (page === "results") {
      // if current recipe is already in user cookbook.
      // we do not need to fetch its info which can save more points
      if (id in userRecipe) {
        url = `/read/bookID?id=${id}`;
        window.location.href = url;
        return;
      }
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
export function dictToArr(dict) {
  const arr = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });
  return arr;
}

/**
 * Helper function, gave back NUM_CURATED_RECIPES random numbers from total numbers
 * @param {Number} total
 * @return {Array}
 */
export function getRandom(total) {
  const randomArray = [];
  const array = [];
  for (let i = 1; i <= total; i++) {
    array.push(i);
  }
  for (let i = 0; i < NUM_CURATED_RECIPES; i++) {
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
export function createCaurtedList() {
  const randomArray = getRandom(NUM_TOTAL_CURATED_RECIPES);
  console.log(randomArray);
  const tempStored = JSON.parse(localStorage.getItem("storedRecipes"));
  const returnRecipes = {};
  randomArray.forEach((e) => {
    returnRecipes[e] = tempStored[e];
  });
  return returnRecipes;
}
/**
 * Result page next page and previous page
 * @param {HTMLElement} previousPage
 * @param {HTMLElement} nextPage
 */
function pageBtn(previousPage, nextPage) {
  previousPage.addEventListener("click", () => {
    fetchNewResult(false, previousPage);
  });
  nextPage.addEventListener("click", () => {
    fetchNewResult(true, previousPage);
  });
}

//  remove all elements have same class name
const removeElements = (elms) => elms.forEach((el) => el.remove());
/**
 * Result page next page and previous page
 * @param {Boolean} nextFlag next page flag
 * @param {HTMLElement} previousPage
 */
function fetchNewResult(nextFlag, previousPage) {
  const url = localStorage.getItem("query");
  let offset = parseInt(localStorage.getItem("offset"));
  if (nextFlag && offset === 0) previousPage.style.display = "block";
  if (!nextFlag && offset === 12) previousPage.style.display = "none";
  if (nextFlag) offset += 12;
  else offset -= 12;
  fetchRecipes(true, `/search/recipe?${url}&offset=${offset}`).then(() => {
    removeElements(document.querySelectorAll(".card"));
    recipeObject = JSON.parse(localStorage.getItem("resultRecipes"));
    recipeObject = dictToArr(recipeObject);
    recipeCards();
  });
  localStorage.setItem("offset", offset);
}
