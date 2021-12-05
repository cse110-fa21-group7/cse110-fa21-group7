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
    localStorage.setItem("currID", 50);
  const recipeObj = ["userRecipes", "resultRecipes"];
  // let exampleFlag = false;
  for (const obj of recipeObj) {
    if (localStorage.getItem(obj) === null) {
      localStorage.setItem(obj, JSON.stringify({}));
      if (obj === "userRecipes") addExamples();
    }
  }
  if (localStorage.getItem("curatedRecipes") === null) await addCurated();
}
/**
 * I will add 2 recipe object to our local storge to help backend debug cook book and read recipe
 * if we do not want to save this example, we can commet out addExamples in init()
 */
function addExamples() {
  const userRecipes = JSON.parse(localStorage.getItem("userRecipes"));
  // userRecipes = JSON.stringify(userRecipes);
  console.log("add examples");
  console.log(userRecipes);
  const ex1 = {
    image: "https://spoonacular.com/recipeImages/75081-312x231.jpg",
    title: "Beef Wellington",
    description: "The recipe Beef Wellington could satisfy your Scottish",
    totalCost: 6.9,
    time: 45,
    servings: 4,
    ingredients: [
      {
        name: "duck",
        amount: "0.5 lb",
      },
      {
        name: "egg",
        amount: "1 ",
      },
      {
        name: "milk",
        amount: "2 tsps",
      },
      {
        name: "mushrooms",
        amount: "8 oz",
      },
    ],
    steps: [
      "In a large saucepan, heat the oil over medium-high heat. Once your oil is hot, brown the beef. Do it in 2 batches if you need to, to allow an even browning on all pieces. Set aside.",
      "In the same pan, fry the onion, garlic, carrots and celery, about 3-5 minutes, before adding the meat back.",
      "Pour in the stock, Guinness, and bay leaf and season to taste.",
      "Add the chocolate if you find it too bitter.",
      "Bring to a boil then lower the heat and simmer for about 1 hours, or until the liquid has reduced. If the sauce isnt thick enough, remove the meat and carrots from the pan using a slotted spoon. In a small bowl, mix a few tablespoons of sauce with 1 tbsp corn flour, whisk until well combined and pour back into the sauce.",
      "Let boil for about 10-15 minutes, until the sauce has thickened, then tip back the meat.",
      "Serve with mashed potatoes.",
      "Find more recipes on my blog http://alalemon.com",
    ],
  };
  const ex2 = {
    image: "https://spoonacular.com/recipeImages/634593-312x231.jpg",
    title: "Beef Bourguignon",
    description: "Beef Bourguignon takes about about 45 minutes",
    totalCost: 2.7,
    time: 55,
    servings: 5,
    ingredients: [
      {
        name: "boneless chuck steak",
        amount: "3 pounds",
      },
      {
        name: "bay leaf",
        amount: "1 piece",
      },
      {
        name: "thyme",
        amount: "0.5 teaspoon",
      },
      {
        name: "peppercorns",
        amount: "1 teaspoon",
      },
      {
        name: "butter",
        amount: "2 tablespoons",
      },
    ],
    steps: [
      "Trim off all beef fat and cut meat into 1 inch cubes. Fry bacon to render fat, drain, set aside. Brown beef in bacon fat, few pieces at a time.",
      "Transfer bacon and beef to casserole and put on moderate heat.",
      "Add brandy and flame. Stir in onions, garlic, flour and coat beef.",
      "Add wine and broth and bring to a simmer.",
      "Tie parsley sprigs, bay, thyme and peppercorns in cheesecloth and add to casserole. Season with salt and pepper and cook in preheated 350 degree oven for 1 1/2 hours.",
      "Cool and refrigerate casserole at least 4 hours or overnight. To reheat, place casserole in preheated 350 degree oven for 20 minutes. In small pan, heat the butter and saute mushrooms until lightly browned.",
      "Add mushrooms to casserole and garnish with chopped parsley.",
      "Serves 8.",
    ],
  };
  userRecipes["51"] = ex1;
  userRecipes["52"] = ex2;
  // update
  localStorage.setItem("userRecipes", JSON.stringify(userRecipes));
  localStorage.setItem("currID", 52);
  // after this line there should be 2 recipes examples saved in local storage
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
