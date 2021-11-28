window.addEventListener("DOMContentLoaded", init);

/**
 * Entry point for initialization scripts
 */
async function init() {
  if (initializeStorage()) {
    addExamples();
  }
}
/** Initializes recipes object from localStorage cache */
/**
 * Represents a book.
 * @constructor
 */
function initializeStorage() {
  console.log("Initializing recipes object");
  let userRecipes = localStorage.getItem("userRecipes");
  // const APIRecipes = localStorage.getItem("APIRecipes");
  const storedRecipes = localStorage.getItem("storedRecipes");
  if (storedRecipes === null) {
    localStorage.setItem("storedRecipes", JSON.stringify({}));
  }
  if (userRecipes === null) {
    userRecipes = {};
    console.log("Recipes not initialized in localStorage cache");
    // Good practice to use brackets to ensure proper type
    userRecipes["currID"] = 1;
    localStorage.setItem("userRecipes", JSON.stringify(userRecipes));
    return true;
  }
  return false;
}

/**
 * I will add 2 recipe object to our local storge to help backend debug cook book and read recipe
 * if we do not want to save this example, we can commet out addExamples in init()
 */
function addExamples() {
  let userRecipes = localStorage.getItem("userRecipes");
  userRecipes = JSON.parse(userRecipes);
  console.log("add examples");
  const ex1 = {
    "img-url": "https://spoonacular.com/recipeImages/75081-312x231.jpg",
    title: "Beef Wellington",
    description: "The recipe Beef Wellington could satisfy your Scottish",
    totalCost: 691.54,
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
    "img-url": "https://spoonacular.com/recipeImages/634593-312x231.jpg",
    title: "Beef Bourguignon",
    description: "Beef Bourguignon takes about about 45 minutes",
    totalCost: 276,
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
  userRecipes["1"] = ex1;
  userRecipes["2"] = ex2;
  userRecipes["currID"] = 3;
  console.log(userRecipes);
  // update
  localStorage.setItem("userRecipes", JSON.stringify(userRecipes));
  // after this line there should be 2 recipes examples saved in local storage
}
