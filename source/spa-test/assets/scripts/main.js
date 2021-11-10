// main.js

import {Router} from './Router.js';

let recipeData = {};

const navbarLinks = [
  ['#ASAP-logo-home', 'home'],
  ['#link-cookbook', 'cookbook'],
  ['#link-create-recipe', 'create-recipe'],
  ['#link-read-recipe', 'read-recipe'],

];

const router = new Router(function() {
  const doc = document;
  doc.querySelector('section.section--navbar').classList.add('shown');
  doc.querySelector('div.div--asap-recipe-header').classList.add('shown');
  doc.querySelector('section.section--home').classList.add('shown');
  doc.querySelector('section.section--create-recipe').classList.remove('shown');
  doc.querySelector('section.section--main-container').classList.add('shown');
  doc.querySelector('section.section--read-recipe').classList.remove('shown');
});

window.addEventListener('DOMContentLoaded', init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  console.log('Initializing');
  bindNavbarLinks();
  createSections();
  bindEscKey();
  getRecipesFromCache();
}

/**
 * Gets recipes from localStorage
 */
function getRecipesFromCache() {
  console.log('Getting recipes from cache');
  const json = localStorage.getItem('recipes');

  if (json === null) {
    console.log('Recipes not initialized in cache');
    localStorage.setItem('recipes', JSON.stringify(recipeData));
    return;
  }

  recipeData = JSON.parse(localStorage.getItem('recipes'));
  if (Object.keys(recipeData).length == 0) {
    console.log('Empty recipes object');
  }
}
/**
 * Takes in recipe id, returns recipe object from recipes
 * @param {String} id
 * @param {HTMLElement} element
 * @return {Object}
 */
function loadRecipe(id, element) {
  const recipe = null;
  if (recipes.id == null) {
    console.log(`Recipes does not contain id: ${id}`);
    return recipe;
  }
  recipe = recipes.id;
  const recipeTitleElem = document.getElementById('recipeTitle')
  recipeTitleElem.innerText = recipe.title
  const ingredient1NameElem = document.getElementById('ingredient1name')
  ingredient1NameElem.innerText = recipe.ingredients[0].name
  // const ingredient2NameElem = document.getElementById('ingredient2name')
  // ingredient2NameElem.innerText = recipe.ingredients[1].name
  const step1Elem = document.getElementById('step1')
  step1Elem.innerText = recipe.steps[0]
}


/**
 * Generates the <recipe-card> elements from the fetched recipes and
 * appends them to the page
 */
function createSections() {
  /*
  let i = 0
  for (const [..., json] of Object.entries(recipeData)) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = json;
    const page = json['page-name'];
    router.addPage(page, function() {
      document.querySelector('.section--recipe-cards').classList.remove('shown');
      document.querySelector('.section--recipe-expand').classList.add('shown');
      document.querySelector('recipe-expand').data = json;
    });
    bindRecipeCard(recipeCard, page);

    document.querySelector('.recipe-cards--wrapper').appendChild(recipeCard);
    if (i > 2) {
      recipeCard.classList.add('hidden');
    }
    i++;
  }
  */
  router.addPage('create-recipe', function() {
    const doc = document;
    doc.querySelector('section.section--navbar').classList.add('shown');
    doc.querySelector('div.div--asap-recipe-header').classList.add('shown');
    doc.querySelector('section.section--home').classList.remove('shown');
    doc.querySelector('section.section--main-container').classList.add('shown');
    doc.querySelector('section.section--create-recipe').classList.add('shown');
    doc.querySelector('section.section--read-recipe').classList.remove('shown');
  });

  router.addPage('read-recipe', function() {
    const doc = document;
    doc.querySelector('section.section--navbar').classList.add('shown');
    doc.querySelector('section.section--home').classList.remove('shown');
    doc.querySelector('div.div--asap-recipe-header').classList.add('shown');
    doc.querySelector('section.section--main-container').classList.add('shown');
    doc.querySelector('section.section--create-recipe')
        .classList.remove('shown');
    doc.querySelector('section.section--read-recipe').classList.add('shown');
  });

  console.log('Router navigate to home');
  router.navigate('home', true);
}

/**
 * Binds the click event listeners to the "Show more" button so that when it is
 * clicked more recipes will be shown
 */
function bindNavbarLinks() {
  console.log('Binding Navbar links');
  navbarLinks.forEach((link) => {
    console.log(link);
    const elem = document.querySelector(link[0]);
    
    elem.addEventListener('click', () => {
      router.navigate(link[1], false);
      console.log(`Clicked ${link[1]}`);
    });
  });
  /*
  const ASAPRecipeLink = document.querySelector('#ASAP-logo-home')
  const linkHome = document.querySelector('#link-home')
  const linkCookbook = document.querySelector('#link-cookbook')
  const linkCreateRecipe = document.querySelector('#link-create-recipe')
  const linkHelp = document.querySelector('#link-help')
  // const showMore = document.querySelector('.button--wrapper > button');
  // const arrow = document.querySelector('.button--wrapper > img');
  // const cardsWrapper = document.querySelector('.recipe-cards--wrapper');

  ASAPRecipeLink.addEventListener('click', () => {
    router.navigate('home', false)
  })

  linkHome.addEventListener('click', () => {
    router.navigate('home', false)
  })

  linkCookbook.addEventListener('click', () => {
    router.navigate('cookbook', false)
  })

  linkCreateRecipe.addEventListener('click', () => {
    router.navigate('create-recipe', false)
  })

  linkHelp.addEventListener('click', () => {
    router.navigate('help', false)
  })
  */
}

/**
 * Binds the click event listener to the <recipe-card> elements added to the
 * page so that when they are clicked, their card expands into the full recipe
 * view mode
 * @param {Element} recipeCard the <recipe-card> element you wish to bind the
 *                              event listeners to
 * @param {String} pageName the name of the page to navigate to on click
 */
function bindRecipeCard(recipeCard, pageName) {
  recipeCard.addEventListener('click', (e) => {
    // console.log(`Clicked on ${pageName}`);
    if (e.path[0].nodeName == 'A') return;
    router.navigate(pageName, false);
  });
}

/**
 * Binds the 'keydown' event listener to the Escape key (esc) such that when
 * it is clicked, the home page is returned to
 */
function bindEscKey() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      router.navigate('home', false);
    }
  });
}
