// read-recipe.js
import { asapInit } from "./init.js";
let recipeObject;
let recipeID;
let userRecipe;
window.addEventListener("DOMContentLoaded", init);
const editButton = document.getElementById("Edit");
const deleteButton = document.getElementById("Delete");

/** Initialize function, begins all of the JS code in this file */
async function init() {
  await asapInit();
  userRecipe = JSON.parse(localStorage.getItem("userRecipes"));
  getPage();
  populateHTML();
}

/**
 * Checks if ID is in localStorage,return it back
 */
function getPage() {
  const url = window.location.href;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // default is reading cookbook
  if (url.includes("bookID")) {
    recipeObject = userRecipe;
  }
  if (url.includes("fetchID")) {
    editButton.innerHTML = `<button type="button" class="btn btn-primary" id="Edit" style="top: 1rem;
  right: -1.5rem;">
          <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
        </button>`;
    deleteButton.style.display = "none";
    recipeObject = JSON.parse(localStorage.getItem("storedRecipes"));
  }
  const id = urlParams.get("id");
  if (id) recipeID = id;
  else console.error("open recipe page incorrectly!!");
}

/** Populate forms by ID
 * @param {int} id
 */
function populateHTML() {
  const recipe = recipeObject[recipeID];
  console.log(`Recipe: ${recipe["title"]}`);
  // get article element, so we can append elements
  // const article = document.getElementById("recipeTitle");

  // add title
  document.getElementById("recipe-title").innerText = recipe["title"];
  // add Description
  document.getElementById("recipe-desc").innerText = recipe["description"];
  // add time
  const timeSpan = document.getElementById("time");
  if ("time" in recipe) {
    timeSpan.innerText = recipe["time"] + " minutes";
  } else {
    timeSpan.innerText = "Ready before you know it";
  }
  // add severings
  const servingSpan = document.getElementById("servings");
  if ("servings" in recipe) {
    servingSpan.innerText = `Servings: ${recipe["servings"]}`;
  } else {
    servingSpan.innerText = "Servings: 1";
  }
  // add cost
  const costSpan = document.getElementById("cost");
  if ("totalCost" in recipe) {
    // appends dollar sign and either does division to get cents -> dollars if spoonacular or just appends price
    costSpan.innerText = `Cost: $${recipe["totalCost"]}`;
  } else {
    costSpan.innerText = "Cost: Bout tree fiddy";
  }
  // add image
  const img = document.getElementById("recipeImg");

  const url = recipe["image"];
  if (!("image" in recipe)) {
    // No image uploaded, set default
    img.src = "../img/default.png";
  } else if (url.includes("https://i.imgur.com")) {
    // Tell imgur to resize image to medium (max 320x320) in case of large src image
    // Saves bandwidth
    const imgUrl = recipe["image"].split(".");
    imgUrl[imgUrl.length - 2] = imgUrl.at(-2) + "m";
    const imgUrlM = imgUrl.join(".");
    img.src = imgUrlM;
  } else {
    // Old img.src code
    img.src = url;
  }
  const ingList = document.getElementById("ingredient-list");
  for (const ingredient of recipe["ingredients"]) {
    const eachIng = document.createElement("li");
    eachIng.innerText = `${ingredient["name"]} ${ingredient["amount"]}`;
    ingList.appendChild(eachIng);
  }

  // add step list
  const stepList = document.getElementById("step-list");
  for (const step of recipe["steps"]) {
    const eachStep = document.createElement("li");
    eachStep.innerText = step;
    stepList.appendChild(eachStep);
  }
}
/** Sets event listeners */
editButton.addEventListener("click", () => {
  if (editButton.innerHTML === "add") {
    // add current recipe to cook book

    userRecipe[recipeID] = recipeObject[recipeID];
    localStorage.setItem("userRecipes", JSON.stringify(userRecipe));
    modalAdd.classList.add("active");
    const addConfirm = document.querySelector("#add-confirm");
    addConfirm.addEventListener("click", () => {
      modalAdd.classList.remove("active");
      window.location.replace(`/read/bookID?id=${recipeID}`);
    });
  } else {
    location.href = `/update?id=${recipeID}`;
  }
});
const closeModalButtons = document.querySelectorAll(".close-button");
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

deleteButton.addEventListener("click", (e) => {
  // Display pop-up boxes
  modal.classList.add("active");
  const closeBtn = document.querySelector("#close-button");
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });
  const confirmBtn = document.querySelector("#confirm-button");
  confirmBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    delete recipeObject[recipeID];
    localStorage.setItem("userRecipes", JSON.stringify(recipeObject));
    location.href = "/cookbook";
  });
});
