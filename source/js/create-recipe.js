// create-recipe.js
const MAX_INGREDIENTS = 20;
const MAX_STEPS = 10;

let userRecipes; // save local storage recipes
let formdata = new FormData();
window.addEventListener("DOMContentLoaded", init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  userRecipes = localStorage.getItem("userRecipes");
  userRecipes = JSON.parse(userRecipes);
  checkID();
  setFormListener();
}

/** Populate forms by ID this is for update recipe form
 * @param {int} id
 */
async function populateForm(id) {
  let recipe;
  if (id in userRecipes) {
    recipe = userRecipes[id];
    console.log(`Found recipe: ${recipe["title"]}`);
  } else {
    console.log(`ID: ${id} does not exist in recipes`);
    return;
  }
  document.getElementById("recipeTitle").value = recipe["title"];
  document.getElementById("recipeDescription").value = recipe["description"];
  document.getElementById("recipeCost").value = recipe["totalCost"];
  const img = document.createElement("img");
  img.src = recipe["img-url"];
  img.height = "200";
  document.getElementById("img-spot").append(img);

  const ingredients = recipe["ingredients"];
  const ingredientsDiv = document.getElementById("ingredients");

  // Get template ingredient element
  const ingElemTemplate = ingredientsDiv
    .getElementsByClassName("ingredient")[0]
    .cloneNode(true);

  // Clear unfilled elements
  const ingredientElems = ingredientsDiv.getElementsByClassName("ingredient");
  while (ingredientElems.length > 0) {
    ingredientElems[0].remove();
  }

  // Populate ingredientsDiv with ingredient elements using recipe data
  for (let i = 0; i < ingredients.length; i++) {
    const ingElem = ingElemTemplate.cloneNode(true);
    ingElem.querySelector(
      ".ingredient-name > .name-label"
    ).innerText = `Ingredient ${i + 1}`;
    ingElem.querySelector(".ingredient-name > input").value =
      ingredients[i].name;
    ingElem.querySelector(".ingredient-amount > input").value =
      ingredients[i].amount;
    ingredientsDiv.appendChild(ingElem);
  }

  const steps = recipe["steps"];
  const stepsDiv = document.getElementById("steps");

  // Get template step element
  const stepElemTemplate = stepsDiv.getElementsByClassName("step-sec")[0];

  // Clear unfilled elements
  const stepsElems = stepsDiv.getElementsByClassName("step-sec");
  while (stepsElems.length > 0) {
    stepsElems[0].remove();
  }

  // Populate stepsDiv with step elements using recipe data
  for (let i = 0; i < steps.length; i++) {
    const stepElem = stepElemTemplate.cloneNode(true);
    stepElem.querySelector(".recipeStep-label").innerText = `Step ${i + 1}`;
    stepElem.querySelector("textarea").value = steps[i];
    stepsDiv.appendChild(stepElem);
  }
}

/** Checks if ID is in url or not, if yes means we need to update current recipe */
function checkID() {
  const queryString = window.location.search;
  // console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  if (id === null) {
    console.log("No id parameter");
    return;
  }
  console.log(`id: ${id}`);
  populateForm(id);
}

/**  Show a message in the invalid-feedback div below the input element
 * @param {HTMLElement} input
 * @param {String} message
 * @param {Boolean} type
 * @return {Boolean}
 */
function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector("div.invalid-feedback");
  // console.log(msg);
  msg.innerText = message;
  // update the class for the input
  if (type) {
    // Valid
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    // Invalid
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
  return type;
}

/** Shows error message
 * @param {HTMLElement} input
 * @param {String} message
 * @return {Function}
 */
function showError(input, message) {
  return showMessage(input, message, false);
}

/**
 * Shows success message
 * @param {HTMLElement} input
 * @return {Function}
 */
function showSuccess(input) {
  return showMessage(input, "", true);
}

/**
 * Checks if an element has a non-empty value
 * @param {HTMLElement} input
 * @param {String} message
 * @return {Function}
 */
function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}

/**
 * Checks if an element has a float value
 * @param {HTMLElement} input
 * @param {String} message
 * @return {Function}
 */
function hasFloat(input, message) {
  if (isNaN(parseFloat(input.value.trim()))) {
    return showError(input, message);
  }
  return showSuccess(input);
}

/**
 * when user want to upload the image, we will upload it to imgur.
 * Also, create a url for us.
 * @param {FormData} dataform
 */
// Image upload, saves URL to recipe object
const file = document.getElementById("recipeImage");
file.addEventListener("change", (e) => {
  formdata = new FormData();
  // if user did not upload image, just return this back
  if (e.target.files[0] === undefined) return;
  formdata.append("image", e.target.files[0]);
  fetch("create/image", {
    method: "post",
    body: formdata,
  })
    .then((res) => res.json())
    .then((data) => {
      const divImg = document.getElementById("img-spot");
      const childImgs = divImg.getElementsByTagName("img");
      let img;
      if (childImgs.length == 0) {
        img = document.createElement("img");
        divImg.append(img);
      } else {
        img = childImgs[0];
      }
      console.log(`URL: ${data.link}`);
      img.src = data.link;
      img.height = "200";
      img.referrerPolicy = "no-referrer";
      recipe["img-url"] = data.link;
    });
});
/**
 * Set up form event listener
 */
function setFormListener() {
  const form = document.getElementById("recipeForm");

  const TITLE_REQUIRED = "Please enter your recipe title";
  const INGREDIENT_NAME_REQUIRED = "Please enter your ingredient name";
  const INGREDIENT_AMOUNT_REQUIRED = "Please enter your ingredient amount";
  const STEP_REQUIRED = "Please enter your recipe instructions";

  // Form submission, saves recipe to localStorage
  form.addEventListener("submit", function (event) {
    // Stop form submission
    event.preventDefault();
    console.log("Submit button clicked");
    let allValid = true;

    // Validate form
    const titleValid = hasValue(
      document.getElementById("recipeTitle"),
      TITLE_REQUIRED
    );
    if (titleValid) {
      recipe["title"] = document.getElementById("recipeTitle").value.trim();
    } else {
      allValid = false;
    }

    recipe["description"] = document
      .getElementById("recipeDescription")
      .value.trim();

    const totalCost = document.getElementById("recipeCost").value.trim();
    let cost = null;
    if (totalCost.length > 0) {
      if (hasFloat(document.getElementById("recipeCost"))) {
        cost = parseFloat(totalCost);
      } else {
        allValid = false;
      }
    }
    recipe["totalCost"] = cost;

    // Set to default if no image uploaded
    if (!("img-url" in recipe)) {
      recipe["img-url"] = "../img/default.png";
    }

    const ingredients = [];
    const ingredientElems = document
      .getElementById("ingredients")
      .getElementsByClassName("ingredient");
    for (let i = 0; i < ingredientElems.length; i++) {
      const ingElem = ingredientElems[i];
      const recipeIng = {};
      const ingredientNameValid = hasValue(
        ingElem.querySelector(".ingredient-name > input"),
        INGREDIENT_NAME_REQUIRED
      );
      const ingredientAmountValid = hasValue(
        ingElem.querySelector(".ingredient-amount > input"),
        INGREDIENT_AMOUNT_REQUIRED
      );
      recipeIng["name"] = ingElem
        .querySelector(".ingredient-name > input")
        .value.trim();
      recipeIng["amount"] = ingElem
        .querySelector(".ingredient-amount > input")
        .value.trim();

      if (ingredientNameValid && ingredientAmountValid) {
        ingredients.push(recipeIng);
      } else {
        allValid = false;
      }
    }

    recipe["ingredients"] = ingredients;

    const steps = [];
    const stepElems = document
      .getElementById("steps")
      .getElementsByClassName("step-sec");
    for (let i = 0; i < stepElems.length; i++) {
      const stepElem = stepElems[i];
      console.log(`stepElem: ${stepElem}`);
      const stepValid = hasValue(
        stepElem.querySelector(".form-control"),
        STEP_REQUIRED
      );
      if (stepValid) {
        const step = stepElem.querySelector(".form-control").value.trim();
        steps.push(step);
      } else {
        allValid = false;
      }
    }
    recipe["steps"] = steps;

    if (allValid) {
      // const id = parseInt(recipes.currID, 10);
      console.log(userRecipes["currID"]);
      userRecipes[userRecipes["currID"]] = recipe;
      userRecipes["currID"] += 1;

      localStorage.setItem("userRecipes", JSON.stringify(userRecipes));
      window.alert("successfully created a recipe!");
      const currUrl = location
        .toString()
        .replace("create-recipe.html", "cook-book.html");
      location.href = currUrl;
    } else {
      console.log("Invalid recipe");
    }
  });

  const addIng = form.querySelector("#add-ingredient");

  // Create additional ingredient element
  addIng.addEventListener("click", function (event) {
    console.log("Add ingredient");
    const ingsDiv = document.getElementById("ingredients");
    const ingElems = ingsDiv.querySelectorAll(".ingredient");
    const numIngs = ingElems.length;

    // Setting hard upper bound per ADR
    if (numIngs >= MAX_INGREDIENTS) {
      console.log("Maximum amount of ingredients");
      return;
    }

    const ingAdded = ingElems[0].cloneNode(true);
    console.log(`numIngs: ${numIngs}`);
    ingAdded.querySelector(
      ".ingredient-name > .name-label"
    ).innerText = `Ingredient ${numIngs + 1}`;
    ingAdded.querySelector(".ingredient-name > .form-control").value = "";
    ingAdded.querySelector(".ingredient-amount > .form-control").value = "";
    ingsDiv.appendChild(ingAdded);
  });

  const addStep = form.querySelector("#add-step");

  // Create additional step element
  addStep.addEventListener("click", function (event) {
    console.log("Add step");
    const stepsDiv = document.getElementById("steps");
    const stepElems = stepsDiv.querySelectorAll(".step-sec");
    const numSteps = stepElems.length;

    // Setting hard upper bound per ADR
    if (numSteps >= MAX_STEPS) {
      console.log("Maximum amount of steps");
      return;
    }

    const stepAdded = stepElems[0].cloneNode(true);
    console.log(`numSteps: ${numSteps}`);
    stepAdded.querySelector(".recipeStep-label").innerText = `Step ${
      numSteps + 1
    }`;
    stepAdded.querySelector(".step-sec > .form-control").value = "";
    stepsDiv.appendChild(stepAdded);
  });

  const removeIng = form.querySelector("#remove-ingredient");

  removeIng.addEventListener("click", function (event) {
    console.log("Remove ingredient");
    const ingsDiv = document.getElementById("ingredients");
    const ingElems = ingsDiv.querySelectorAll(".ingredient");
    if (ingElems.length > 1) {
      ingElems[ingElems.length - 1].remove();
    }
  });

  const removeStep = form.querySelector("#remove-step");

  removeStep.addEventListener("click", function (event) {
    console.log("Remove step");
    const stepsDiv = document.getElementById("steps");
    const stepElems = stepsDiv.querySelectorAll(".step-sec");
    if (stepElems.length > 1) {
      stepElems[stepElems.length - 1].remove();
    }
  });
}
