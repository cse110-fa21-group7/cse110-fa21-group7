import { init } from "./init.js";
window.addEventListener("DOMContentLoaded", currInit);
let recipeObject;
let page;
/** Initialize function, begins all of the JS code in this file */
async function currInit() {
  await init(); // wait for init local storage
  makePage(); // make html page for current page
}

/**
 * make page depends on what page you want to show
 */
function makePage() {
  const queryString = window.location.href;
  // this is recipe read page, need to convert to SPA
  if (queryString.includes("read")) {
    const cardContainer = document.querySelector(".recipe-card-container");
    if (cardContainer.classList.contains("shown"))
      cardContainer.classList.remove("shown");
    // recipe read need to hide recipe-read-container
    const readContainer = document.querySelector(".recipe-read-container");
    if (!readContainer.classList.contains("shown"))
      readContainer.classList.add("shown");
    return;
  }
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
    hideList = ["search", "curatedList"];
    console.log("result");
    recipeObject = JSON.parse(localStorage.getItem("resultRecipes"));
  }
  // all cards need to show recipe-card-container
  const cardContainer = document.querySelector(".recipe-card-container");
  if (!cardContainer.classList.contains("shown"))
    cardContainer.classList.add("shown");
  // recipe read need to hide recipe-read-container
  const readContainer = document.querySelector(".recipe-read-container");
  if (readContainer.classList.contains("shown"))
    readContainer.classList.remove("shown");
  document.querySelector(".recipe-card-container").classList.add("shown");
  document.querySelector(".recipe-read-container").classList.remove("shown");
  for (const show of showList) {
    const ele = document.querySelector(`.${show}`);
    if (!ele.classList.contains("shown")) ele.classList.add("shown");
  }
  for (const hide of hideList) {
    const ele = document.querySelector(`.${hide}`);
    if (ele.classList.contains("shown")) ele.classList.remove("shown");
  }
  recipeCards(); // create recipe card
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
    let url = `/read?fetchID=${id}`;
    if (page === "cookbook") url = `/read?bookID=${id}`;
    window.location.href = url;
  });
}
