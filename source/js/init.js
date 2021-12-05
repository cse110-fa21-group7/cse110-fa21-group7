/**
 * Entry point for initialization scripts
 */
export async function asapInit() {
  const theme = localStorage.getItem("theme");
  if (theme === null) {
    localStorage.setItem("theme", "light");
  } else {
    if (theme === "dark") {
      console.log("to be dark now!");
      document.documentElement.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
    }
  }

  if (localStorage.getItem("currID") === null)
    localStorage.setItem("currID", 0);
  const recipeObj = ["userRecipes", "resultRecipes"];
  // let exampleFlag = false;
  for (const obj of recipeObj) {
    if (localStorage.getItem(obj) === null) {
      localStorage.setItem(obj, JSON.stringify({}));
    }
  }
  if (localStorage.getItem("curatedRecipes") === null) await addCurated();
}
/**
 * Load curate recipes into localStorage from JSON file
 */
async function addCurated() {
  await fetch("../json/curated.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      localStorage.setItem("curatedRecipes", JSON.stringify(json));
      localStorage.setItem("storedRecipes", JSON.stringify(json));
    });
}

const lightMode = document.querySelector("#lightMode");
const darkMode = document.querySelector("#darkMode");
lightMode.addEventListener("click", () => {
  document.documentElement.classList.replace("dark", "light");
  localStorage.setItem("theme", "light");
});
darkMode.addEventListener("click", () => {
  console.log("go dark");
  document.documentElement.classList.replace("light", "dark");
  localStorage.setItem("theme", "dark");
});
