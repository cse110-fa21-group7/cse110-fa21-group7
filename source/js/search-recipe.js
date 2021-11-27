window.addEventListener("DOMContentLoaded", init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  setSearchListener();
  
}

/**
 * Fetches search results and populates index.html
 * @param {String} query 
 * @return {null}
 */
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
  // const storage = window.localStorage;
  // const searchedRecipeIDs = JSON.parse(storage.getItem("searchedRecipeIDs"));
  // if (Object.keys(recipeID).length !== 0) {

  // }
  /*
  for (const recipe of data["results"]) {
    searchedRecipeIDs[recipe["id"]] = recipe;
  }
  
  // update
  // Store full recipes in searchedRecipes
  localStorage.setItem("searchedRecipeIDs", JSON.stringify(searchedRecipeIDs));
  */

  displaySearchResults(data["results"]);

  // log the result
  setTimeout(() => {
    console.log(data["results"]);
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

  // const searchForm = document.getElementById("search-form");
  const searchbtn = document.getElementById("search-button");
  searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchField = document.getElementById("query");

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

let cardTemplate = null;

/**
 * Populates index.html results section with recipe card elements 
 * @param {Object} searchedRecipeIDs 
 */
function displaySearchResults(searchedRecipeIDs) {
  const curatedList = document.getElementById('curated-list');
  curatedList.style.visibility = 'hidden';
  let recipeCardDiv;
  if (cardTemplate == null) {
    recipeCardDiv = curatedList.querySelector('.card');
    recipeCardDiv.querySelector('.info-row').remove();
    console.log(recipeCardDiv);
    cardTemplate = recipeCardDiv;

  } else {
    recipeCardDiv = cardTemplate;

  }


  const results = document.getElementById('results');

  // Clear results
  const cards = results.querySelectorAll('.card');
  for (const card of cards) {
    card.remove();
  }


  for (const recipe of searchedRecipeIDs) {
    const card = recipeCardDiv.cloneNode(true);
    card.setAttribute('recipeID', recipe['id']);
    card.setAttribute('Added', false);
    const img = card.querySelector('img');
    img.src = recipe['image'];
    const title = card.querySelector('.card__title');
    title.innerText = recipe['title'];
    card.addEventListener('click', (e) => {
      if (card.getAttribute('Added') == 'false') {
        // alert(`Main body click, Added: ${card.getAttribute('Added')}`);
        window.location.href = `/previewRecipe?id=${recipe['id']}`;
      }
      
    });
    card.querySelector('.add-to-cookbook').addEventListener('click', (e) => {
      card.setAttribute('Added', 'true');
      window.location.href = `/previewRecipe?id=${recipe['id']}`;
      // alert(`recipeID: ${recipe['id']}, Title: ${recipe['title']}`);
    });
    
    results.appendChild(card);
  }





}
