let query;
/**
 * Fetches search results and populates index.html
 * @param {Boolean} pageFlag search query
 * @param {String} url fetch url
 * @return {null}
 */
export async function fetchRecipes(pageFlag, url) {
  const res = await fetch(url); // return back the reicpes object from spoonacular
  const data = await res.json();
  if (data.code === "404") {
    alert("Recipe not found");
    return;
  }
  if (data.code === 401) {
    alert("Invalid API Key");
    return;
  }
  const resultRecipes = {};
  for (const recipe of data["results"]) {
    resultRecipes[recipe["id"]] = recipe;
  }
  console.log(resultRecipes);
  // update
  // Store full recipes in searchedRecipes
  localStorage.setItem("resultRecipes", JSON.stringify(resultRecipes));
  if (!pageFlag) {
    localStorage.setItem("query", url);
    const urlchange = `/result?query=${query}`;
    window.location.href = urlchange;
  }
}

/**
 * Set up event listener for search
 */
const searchbtn = document.getElementById("search-button");
searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchField = document.getElementById("query");
  // get select
  const dietSele = document.getElementById("diet");
  const mealSele = document.getElementById("meal-type");
  const intolSele = document.getElementById("Intolerances");
  // save select result
  query = searchField.value;
  const diet = dietSele.value;
  const meal = mealSele.value;
  const intoler = intolSele.value;
  let url = `/search/recipe?query=${query}`;
  if (diet !== "") url += `&diet=${diet}`;
  if (meal !== "") url += `&type=${meal}`;
  if (intoler !== "") url += `&intolerances=${intoler}`;
  localStorage.setItem("offset", 0);
  fetchRecipes(false, url);
});
/**
 * Gets full recipe from Spoonacular API based on ID
 * @param {String} id
 * @return {Object}
 */
export async function fetchFullRecipe(id) {
  const storedRecipes = JSON.parse(localStorage.getItem("storedRecipes"));
  if (id in storedRecipes) {
    return;
  } else {
    console.log("Fetching full recipe");
    const url = `/search/recipeId?id=${id}`;
    // Return the recipe object from spoonacular
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === "404") {
      alert("Recipe not found");
      return null;
    }
    if (data.code === 401) {
      alert("Invalid API Key");
      return null;
    }
    storedRecipes[id] = spoonToASAP(data);
    localStorage.setItem("storedRecipes", JSON.stringify(storedRecipes));
  }
}
/**
 * Converts Spoonacular recipe object into ASAP recipe object
 * @param {Object} data
 * @return {Object}
 */
function spoonToASAP(data) {
  const asap = {};
  asap["title"] = data["title"];
  asap["description"] = removeTags(data["summary"]).substring(0, 300) + "...";
  asap["servings"] = data["servings"];
  asap["totalCost"] = (parseFloat(data["pricePerServing"]) / 100).toFixed(2);
  asap["time"] = data["readyInMinutes"];
  asap["image"] = data["image"];

  const ingredients = [];
  for (const dataIng of data["extendedIngredients"]) {
    const ingredient = {};
    ingredient["name"] = dataIng["name"];
    ingredient["amount"] =
      dataIng["measures"]["us"]["amount"] +
      " " +
      dataIng["measures"]["us"]["unitShort"];
    ingredients.push(ingredient);
  }
  asap["ingredients"] = ingredients;

  const steps = [];
  for (const dataStep of data["analyzedInstructions"][0]["steps"]) {
    const step = dataStep["step"];
    steps.push(step);
  }
  asap["steps"] = steps;

  return asap;
}

/**
 * Helper function, removes HTML tags from recipe summary
 * @param {String} str
 * @return {String}
 */
function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}
