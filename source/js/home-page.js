window.addEventListener("DOMContentLoaded", init);
const recipeData = {};
/** Initialize function, begins all of the JS code in this file */
async function init() {
  const queryString = window.location.href;
  console.log(queryString);
  // default is home page and curatedRecipes
  let page = "home";
  // switch recipeObject depends on which page we want to show
  let recipeObject = JSON.parse(localStorage.getItem("curatedRecipes"));
  // if we want to show cookbook, the recipeObject should be userRecipes which saved in localStorge
  if (queryString.includes("cookbook")) {
    page = "cookbook";
    console.log("cook book!!!");
    recipeObject = JSON.parse(localStorage.getItem("userRecipes"));
  } else if (queryString.includes("result")) {
    page = "results";
    console.log("result");
    recipeObject = JSON.parse(localStorage.getItem("resultRecipes"));
  }
  makePage(page);
  recipeCards(page, recipeObject);
}

/**
 * make page depends on what page you want to show
 * @param {string} page
 */
function makePage(page) {
  // all sections we need to deal with
  // const secitonList = ["search", "cookbook", "results", "curatedList"];
  // only cookbook page need to hide this section
  document.querySelector(".recipe-card-containe").classList.add("shown");

  let showList;
  let hideList;
  if (page === "home") {
    showList = ["search", "curatedList"];
    hideList = ["cookbook", "results"];
    // document.querySelector(".recipe-card-containe").classList.add("shown");
  } else if (page === "cookbook") {
    showList = ["cookbook"];
    // only cookbook need to hide the whole recipe-card-containe
    hideList = ["search", "results", "curatedList"];
  } else if (page === "results") {
    showList = ["search", "results"];
    hideList = ["search", "curatedList"];
  }
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
 * @param {string} page want to know which page we're working on
 * @param {JSON} recipeObject
 */
function recipeCards(page, recipeObject) {
  const section = document.querySelector(`.${page}`);
  // loop whole local storge
  console.log(recipeObject);
  for (const [key, value] of Object.entries(recipeObject)) {
    if (key === "currID") continue;
    const card = document.createElement("recipe-card");
    card.setPage(page);
    card.data = value;
    section.appendChild(card);
    readRecipe(page, card, key);
  }
}

/**
 * Add event listeners to recipe card elements
 * @param {String} page
 * @param {HTMLElement} recipeCard
 * @param {String} id
 */
function readRecipe(page, recipeCard, id) {
  recipeCard.addEventListener("click", (e) => {
    let url = `/recipeDetails?uid=${id}`;
    if (page === "results") {
      url = `/recipeDetails?rid=${id}`;
    }
    window.location.href = url;
  });
}
