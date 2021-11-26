window.addEventListener("DOMContentLoaded", init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  setSearchListener();
}

async function fetchRecipes(query) {
  const url = `/search?query=${query}`;
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
  // --- we should use recipes ID to fetch all recipe's info, need other team member implement this part------
  const storage = window.localStorage;
  const recipeID = JSON.parse(storage.getItem("recipeID"));
  // if (Object.keys(recipeID).length !== 0) {

  // }
  for (const recipe of data["results"]) {
    recipeID[recipe["id"]] = recipe;
  }
  // update
  localStorage.setItem("recipeID", JSON.stringify(recipeID));
  // log the reuslt
  setTimeout(() => {
    console.log(recipeID);
  }, 10);
  // for (const [key, value] of Object.entries(recipes)) {
  //   if (key !== "currID") {
  //     recipeData[key] = value;
  //   }
  // }
  // console.log(recipeData);
  // return true;
}

/**
 * Set up event listener for search
 */
function setSearchListener() {
  const searchForm = document.getElementById("search-form");
  const searchbtn = document.getElementById("search-button");
  searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchField = searchForm.querySelector("#query");
    const queryText = searchField.value;
    console.log(`Search query: ${queryText}`);
    if (queryText.value === "") {
      alert("Please enter recipe you want to search");
    } else {
      fetchRecipes(queryText);
    }
  });

  /*
    // fetch the recipes and wait for them to load
    const fetchSuccessful = await fetchRecipes();
    // if they didn't successfully load, quit the function
    if (!fetchSuccessful) {
      console.log("Recipe fetch unsuccessful");
      return;
    }
    // Add the first three recipe cards to the page
    createRecipeCards();
    */
}
