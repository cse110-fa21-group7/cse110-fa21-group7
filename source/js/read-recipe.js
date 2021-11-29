// read-recipe.js

let recipeObject;
let recipeID;
window.addEventListener("DOMContentLoaded", init);
const editButton = document.getElementById("Edit");
const deleteButton = document.getElementById("Delete");

/** Initialize function, begins all of the JS code in this file */
async function init() {
  getPage();
  populateHTML();
}

/**
 * Checks if ID is in localStorage,return it back
 */
function getPage() {
  const url = window.location.href;
  const queryString = window.location.search;
  console.log(queryString);

  const urlParams = new URLSearchParams(queryString);
  // default is reading cookbook
  if (url.includes("bookID")) {
    recipeObject = JSON.parse(localStorage.getItem("userRecipes"));
  }
  if (url.includes("fetchID")) {
    console.log("fetch");
    editButton.innerHTML = "add";
    deleteButton.style.display = "none";
    recipeObject = JSON.parse(localStorage.getItem("storedRecipes"));
  }
  const id = urlParams.get("id");
  // console.log(queryString);
  console.log(`id: ${id}`);
  if (id) recipeID = id;
  else console.error("open recipe page incorrectly!!");
}

/** Populate forms by ID
 * @param {int} id
 */
function populateHTML() {
  const recipe = recipeObject[recipeID];
  console.log(recipeObject);
  console.log(`Recipe: ${recipe["title"]}`);
  // get article element, so we can append elements
  // const article = document.getElementById("recipeTitle");

  // add title
  document.getElementById("recipeTitle").innerText = recipe["title"];

  // add Description
  document.getElementById("recipeDescription").innerText =
    recipe["description"];

  const detailDiv = document.querySelector(".detail");
  const servingDiv = detailDiv.querySelector(".serving");
  const servingSpan = servingDiv.getElementsByTagName("span")[1];
  if ("servings" in recipe) {
    servingSpan.innerText = `Servings: ${recipe["servings"]}`;
  } else {
    servingSpan.innerText = "Servings: 1";
  }

  const costDiv = detailDiv.querySelector(".cost");
  const costSpan = costDiv.getElementsByTagName("span")[1];
  if ("totalCost" in recipe) {
    // appends dollar sign and either does division to get cents -> dollars if spoonacular or just appends price
    costSpan.innerText = `Cost: $${recipe["totalCost"]}`;
  } else {
    costSpan.innerText = "Cost: Bout tree fiddy";
  }

  const timeDiv = detailDiv.querySelector(".time");
  const timeSpan = timeDiv.getElementsByTagName("span")[1];
  if ("time" in recipe) {
    timeSpan.innerText = recipe["time"] + " minutes";
  } else {
    timeSpan.innerText = "Ready before you know it";
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
    const eachIng = document.createElement("div");
    eachIng.classList.add("each-ingredient");
    const label = document.createElement("label");
    label.innerText = `${ingredient["name"]} ${ingredient["amount"]}`;
    label.classList.add("container");
    const input = document.createElement("input");
    input.type = "checkbox";
    const span = document.createElement("span");
    span.classList.add("checkmark");
    label.append(input, span);
    eachIng.appendChild(label);
    ingList.appendChild(eachIng);
  }
  // add step list
  const stepList = document.getElementById("steps-list");
  const ul = document.createElement("ol");
  for (const step of recipe["steps"]) {
    ul.classList.add("orderList");
    const li = document.createElement("li");
    li.innerHTML = step;
    ul.appendChild(li);
  }
  stepList.appendChild(ul);
}
/**
 * Populates recipes object from localStorage
 */
// function addRecipe() {
//   const storedRecipes = JSON.parse(localStorage.getItem("storedRecipes"));
//   userRecipes[recipeID] = storedRecipes[recipeID];
//   localStorage.setItem("userRecipes", JSON.stringify(userRecipes));
// }
/** Sets event listeners */
editButton.addEventListener("click", () => {
  if (editButton.innerHTML === "add") {
    // add current recipe to cook book
    // addRecipe();
  } else {
    location.href = `/update?id=${recipeID}`;
  }
});

deleteButton.addEventListener("click", (e) => {
  delete recipeObject[recipeID];
  localStorage.setItem("userRecipes", JSON.stringify(recipeObject));
  window.alert("successfully deleted the recipe!");
  window.location.href = "/cookbook";
});
