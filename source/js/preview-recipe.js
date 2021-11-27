// read-recipe.js

let recipe = {};
let recipeID;
window.addEventListener("DOMContentLoaded", init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  getID();
  
  setButtonListener();
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
  if (id) {
    recipeID = id;
    fetchFullRecipe(recipeID);
    
  }
  else console.error("open recipe page incorrectly!!");
}

/**
 * Gets full recipe from Spoonacular API based on ID
 * @param {String} id 
 * @return {null}
 */
async function fetchFullRecipe(id) {
  const storedRecipes = JSON.parse(localStorage.getItem('storedRecipes'));
  if (id in storedRecipes) {
    recipe = storedRecipes[id];
  } else {
    console.log('fetching full recipe');
    const url = `/search/recipe?id=${id}`;
    const res = await fetch(url); // return back the reicpes object from spoonacular
    console.log(res);
    const data = await res.json();
    if (data.cod === "404") {
      alert("Recipe not found");
      return;
    }
    if (data.cod === 401) {
      alert("Invalid API Key");
      return;
    }
    console.log('recipe:');
    console.log(data);
    recipe = data;
    storedRecipes[id] = data;  
    localStorage.setItem('storedRecipes',  JSON.stringify(storedRecipes));
  }
  populateHTML();  
} 
/**
 * Helper function, removes HTML tags from recipe summary
 * @param {String} str 
 * @return {String} 
 */
function removeTags(str) {
  if ((str===null) || (str===''))
      return false;
  else
      str = str.toString();
        
  // Regular expression to identify HTML tags in 
  // the input string. Replacing the identified 
  // HTML tag with a null string.
  return str.replace( /(<([^>]+)>)/ig, '');
}

/** Populate forms by ID
 * @param {int} id
 */
function populateHTML() {
  console.log(`Recipe: ${recipe["title"]}`);
  // get article element, so we can append elements
  // const article = document.getElementById("recipeTitle");

  // add title
  document.getElementById("recipeTitle").innerText = recipe["title"];

  // add Description
  let description;
  if ('description' in recipe) {
    description = recipe['description'];
  } else if ('summary' in recipe) {
    description = removeTags(recipe['summary']).substring(0,300) + '...';
  }
  document.getElementById("recipeDescription").innerText = description;

  const detailDiv = document.querySelector(".detail");
  const servingDiv = detailDiv.querySelector(".serving");
  const servingSpan = servingDiv.getElementsByTagName("span")[1];
  if ("servings" in recipe) {
    servingSpan.innerText = recipe["servings"];
  } else {
    servingSpan.innerText = "Servings: 1";
  }

  const costDiv = detailDiv.querySelector(".cost");
  const costSpan = costDiv.getElementsByTagName("span")[1];
  if ("totalCost" in recipe) {
    // appends dollar sign and either does division to get cents -> dollars if spoonacular or just appends price
    if (recipe["img-url"].includes("https://spoonacular.com")) {
      costSpan.innerText = `Cost: $${(recipe["totalCost"] / 100).toFixed(2)}`;
    } else {
      costSpan.innerText = `Cost: $${recipe["totalCost"]}`;
    }
  } else if ('pricePerServing' in recipe) {
    costSpan.innerText = `Cost: $${(recipe['pricePerServing'] / 100).toFixed(2)}`;
  } else {
    costSpan.innerText = "Cost: Bout tree fiddy";
  }

  const timeDiv = detailDiv.querySelector(".time");
  const timeSpan = timeDiv.getElementsByTagName("span")[1];
  if ("time" in recipe) {
    timeSpan.innerText = recipe["time"];
  } else if ('readyInMinutes' in recipe) { 
    timeSpan.innerText = recipe['readyInMinutes'];
  } else {
    timeSpan.innerText = "Ready before you know it";
  }

  // add image
  const img = document.getElementById("recipeImg");

  if ('img-url' in recipe) {
    const url = recipe["img-url"];
    if (url.includes("https://i.imgur.com")) {
      // Tell imgur to resize image to medium (max 320x320) in case of large src image
      // Saves bandwidth
      const imgUrl = recipe["img-url"].split(".");
      imgUrl[imgUrl.length - 2] = imgUrl.at(-2) + "m";
      const imgUrlM = imgUrl.join(".");
      img.src = imgUrlM;
    } else {
      // Old img.src code
      img.src = url;
    }
  } else if ('image' in recipe) {
    img.src = recipe['image'];
  } else {
    // No image uploaded, set default
    img.src = "../img/default.png";
  }
  

  const ingList = document.getElementById("ingredient-list");
  if ('ingredients' in recipe) {
    for (const ingredient of recipe["ingredients"]) {
      const eachIng = document.createElement("div");
      eachIng.classList.add("each-ingredient");
      const label = document.createElement("label");
      label.innerText = `${ingredient["name"]} ${(ingredient["amount"]).toFixed(2)}`;
      label.classList.add("container");
      const input = document.createElement("input");
      input.type = "checkbox";
      const span = document.createElement("span");
      span.classList.add("checkmark");
      label.append(input, span);
      eachIng.appendChild(label);
      ingList.appendChild(eachIng);
    }

  } else if ('extendedIngredients' in recipe) {
    for (const ingredient of recipe['extendedIngredients']) {
      const eachIng = document.createElement("div");
      eachIng.classList.add("each-ingredient");
      const label = document.createElement("label");
      label.innerText = `${ingredient["name"]} ${(ingredient["amount"]).toFixed(2)}`;
      label.classList.add("container");
      const input = document.createElement("input");
      input.type = "checkbox";
      const span = document.createElement("span");
      span.classList.add("checkmark");
      label.append(input, span);
      eachIng.appendChild(label);
      ingList.appendChild(eachIng);
    }
  }
  
  // add step list
  const stepList = document.getElementById("steps-list");
  const ul = document.createElement("ol");
  if ('steps' in recipe) {
    for (const step of recipe["steps"]) {
      ul.classList.add("orderList");
      const li = document.createElement("li");
      li.innerHTML = step;
      ul.appendChild(li);
    }
    stepList.appendChild(ul);

  } else if ('analyzedInstructions' in recipe) {
    for (const step of recipe["analyzedInstructions"][0]['steps']) {
      ul.classList.add("orderList");
      const li = document.createElement("li");
      li.innerHTML = step['step'];
      ul.appendChild(li);
    }
    stepList.appendChild(ul);

  }
  
}

/** Sets event listeners */
function setButtonListener() {
  const editButton = document.getElementById("Add");
  editButton.addEventListener("click", (e) => {
    alert(`Adding recipe ID: ${recipeID}`);
    // location.href = `/updateRecipe?id=${recipeID}`;
  });

  return;
}

