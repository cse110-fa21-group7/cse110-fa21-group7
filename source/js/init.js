window.addEventListener("DOMContentLoaded", asapInit);
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
  if (localStorage.getItem("offset") === null)
    localStorage.setItem("offset", 0);
  if (localStorage.getItem("currID") === null)
    localStorage.setItem("currID", 50);
  const recipeObj = ["userRecipes", "resultRecipes"];
  // let exampleFlag = false;
  for (const obj of recipeObj) {
    if (localStorage.getItem(obj) === null) {
      localStorage.setItem(obj, JSON.stringify({}));
    }
  }
  if (localStorage.getItem("storedRecipes") === null) await addCurated();
  changeMode();
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
      localStorage.setItem("storedRecipes", JSON.stringify(json));
    });
}
/**
 * change html mode
 */
function changeMode() {
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

  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-nav");
  hamburger.addEventListener("click", (e) => {
    hamburger.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-active");
  });
}
