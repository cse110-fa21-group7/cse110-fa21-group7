let recipes = {};
window.addEventListener("DOMContentLoaded", init);
async function init() {
  if (initializeStorage()) {
    addExamples();
  }
  checkID();
}
/** Initializes recipes object from localStorage cache */
/**
 * Represents a book.
 * @constructor
 */
function initializeStorage() {
  console.log("Initializing recipes object");
  const json = localStorage.getItem("recipes");
  if (json === null) {
    console.log("Recipes not initialized in localStorage cache");
    // Good practice to use brackets to ensure proper type
    recipes["currID"] = 1;
    localStorage.setItem("recipes", JSON.stringify(recipes));
    return true;
  }
  return false;
}

/** Checks if ID is in localStorage */
function checkID() {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  if (id === null) {
    console.log("No id parameter");
    return;
  }
  console.log(`id: ${id}`);
  populateForm(id);
}
/**
 * I will add 2 recipe object to our local storge to help backend debug cook book and read recipe
 * if we do not want to save this example, we can commet out addExamples in init()
 */
function addExamples() {
  console.log("add examples");
  const ex1 = {
    "img-url": "https://spoonacular.com/recipeImages/75081-312x231.jpg",
    title: "Beef Wellington",
    description:
      'The recipe Beef Wellington could satisfy your Scottish craving in about <b>2 hours and 19 minutes</b>. This recipe serves 10 and costs $6.92 per serving. One serving contains <b>707 calories</b>, <b>67g of protein</b>, and <b>38g of fat</b>. It works well as a main course. 1 person has made this recipe and would make it again. Head to the store and pick up mushrooms, wine, milk, and a few other things to make it today. To use up the egg you could follow this main course with the <a href="https://spoonacular.com/recipes/rose-levy-beranbaums-chocolate-tomato-cake-with-mystery-ganache-27408">Rose Levy Beranbaum\'s Chocolate Tomato Cake with Mystery Ganache</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 73%</b>. This score is solid. Try <a href="https://spoonacular.com/recipes/beef-wellington-72534">Beef Wellington</a>, <a href="https://spoonacular.com/recipes/beef-wellington-221452">Beef Wellington</a>, and <a href="https://spoonacular.com/recipes/beef-wellington-72490">Beef Wellington</a> for similar recipes.',
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
    description:
      'Beef Bourguignon takes about <b>about 45 minutes</b> from beginning to end. This recipe makes 8 servings with <b>406 calories</b>, <b>39g of protein</b>, and <b>21g of fat</b> each. For <b>$2.76 per serving</b>, this recipe <b>covers 25%</b> of your daily requirements of vitamins and minerals. Only a few people really liked this main course. This recipe from Foodista requires strong beef broth, bay leaf, butter, and peppercorns. 1 person has made this recipe and would make it again. With a spoonacular <b>score of 56%</b>, this dish is solid. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/beef-bourguignon-buf-bourguignon-buf-la-bourguignonne-beef-burgundy-521886">Beef bourguignon (bœuf bourguignon / bœuf à la bourguignonne / beef Burgundy)</a>, <a href="https://spoonacular.com/recipes/beef-bourguignon-735745">Beef Bourguignon</a>, and <a href="https://spoonacular.com/recipes/beef-bourguignon-940129">Beef Bourguignon</a>.',
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
  recipes["1"] = ex1;
  recipes["2"] = ex2;
  recipes["currID"] = 3;
  console.log(recipes);
  // update
  localStorage.setItem("recipes", JSON.stringify(recipes));
  // after this line there should be 2 recipes examples saved in local storage
}
