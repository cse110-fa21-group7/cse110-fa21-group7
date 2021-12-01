import { asapInit } from "./init.js";
import { fetchFullRecipe } from "./search-recipe.js";
window.addEventListener("DOMContentLoaded", init);
let recipeObject;
let page;
/** Initialize function, begins all of the JS code in this file */
async function init() {
  await asapInit(); // wait for init local storage
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
  const intro = document.querySelector(".search-introduction");
  intro.innerHTML = "Search and save your favorite recipes.";
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
    intro.innerHTML = "Here are your recipes.";

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
    toReadRecipe(card, key);
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
      // alert("readRecipe curatedList preview");
      window.location.href = url;
    } else if (page === "cookbook") {
      url = `/read/bookID?id=${id}`;
      window.location.href = url;
    } else if (page === "results") {
      fetchFullRecipe(id).then(() => {
        window.location.href = url;
      });
    }
  });
}
