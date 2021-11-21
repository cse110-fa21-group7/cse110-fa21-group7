// read-recipe.js

let recipes = {};
let recipeID;
window.addEventListener("DOMContentLoaded", init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  getRecipes();
  getID();
  populateHTML();
  setButtonListener();
}
function getRecipes() {
  recipes = localStorage.getItem("recipes");
  recipes = JSON.parse(recipes);
}
/**
 * Checks if ID is in localStorage,return it back
 */
function getID() {
  const queryString = window.location.search;
  // console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  console.log(`id: ${id}`);
  if (id) recipeID = id;
  else console.error("open recipe page incorrectly!!");
}

/** Populate forms by ID
 * @param {int} id
 */
function populateHTML() {
  const recipe = recipes[recipeID];
  console.log(`Recipe: ${recipe["title"]}`);
  // get article element, so we can append elements
  // const article = document.getElementById("recipeTitle");
  // add title
  document.getElementById("recipeTitle").innerText = recipe["title"];
  // add image
  const img = document.getElementById("recipeImg");
  img.src = recipe["img-url"];
  // add Description
  document.getElementById("recipeDescription").innerText =
    recipe["description"];
  // add ingredient list
  const ingList = document.getElementById("ingredient-list");
  for (const ingredient of recipe["ingredients"]) {
    console.log(ingredient);
    const eachIng = document.createElement("div");
    eachIng.classList.add("each-ingredient");
    const input = document.createElement("input");
    input.type = "checkbox";
    eachIng.appendChild(input);
    const label = document.createElement("label");
    label.innerText = `${ingredient["name"]} ${ingredient["amount"]}`;
    eachIng.appendChild(label);
    ingList.appendChild(eachIng);
  }
  // add step list
  const stepList = document.getElementById("steps-list");
  const ul = document.createElement("ol");
  for (const step of recipe["steps"]) {
    console.log(step);
    ul.classList.add("orderList");
    const li = document.createElement("li");
    li.innerHTML = step;
    ul.appendChild(li);
  }
  stepList.appendChild(ul);
}

/** Sets event listeners */
function setButtonListener() {
  const editButton = document.getElementById("Edit");
  editButton.addEventListener("click", (e) => {
    location.href = `update-recipe.html?id=${recipeID}`;
  });

  const deleteButton = document.getElementById("Delete");
  const modal = document.getElementById("deleteModal");

  deleteButton.onclick = function () {
    console.log("Delete clicked");
    modal.style.display = "block";
  };

  const span = modal.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };

  const deleteSpan = modal.getElementsByClassName("delete")[0];
  deleteSpan.onclick = function () {
    console.log(`Deleting ${recipeID}`);
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  return;
}
