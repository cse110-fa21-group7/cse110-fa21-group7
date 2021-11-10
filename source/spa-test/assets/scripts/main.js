// main.js

import { Router } from './Router.js'

const recipeData = {}

const router = new Router(function () {
  document.querySelector('section.section--navbar').classList.add('shown')
  document.querySelector('div--asap-recipe-header').classList.add('shown')
  document.querySelector('section.section--create-recipe').classList.add('shown')
  document.querySelector('section.section--main-container').classList.add('shown')
  document.querySelector('section.section--read-recipe').classList.remove('shown')
})

window.addEventListener('DOMContentLoaded', init)

// Initialize function, begins all of the JS code in this file
async function init () {
  console.log('Initializing')
  createSections()
  bindEscKey()
  bindNavbarLinks()
}



/**
 * Generates the <recipe-card> elements from the fetched recipes and
 * appends them to the page
 */
function createSections () {
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
  document.querySelector('section.section--navbar').classList.add('shown')
  document.querySelector('div.div--asap-recipe-header').classList.add('shown')
  document.querySelector('section.section--create-recipe').classList.add('shown')
  document.querySelector('section.section--main-container').classList.add('shown')
  document.querySelector('section.section--read-recipe').classList.remove('shown')
}

const navbarLinks = [
  ['#ASAP-logo-home', 'home'],
  ['#link-home', 'home'],
  ['#link-cookbook', 'cookbook'],
  ['#link-create-recipe', 'create-recipe'],
  ['#link-help', 'help']
]

/**
 * Binds the click event listeners to the "Show more" button so that when it is
 * clicked more recipes will be shown
 */
function bindNavbarLinks () {
  navbarLinks.forEach(link => {
    const elem = document.querySelector(link[0])
    elem.addEventListener('click', () => {
      router.navigate(link[1], false)
      console.log(`Clicked ${link[1]}`)
    })
  })
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
 * Binds the click event listener to the <recipe-card> elements added to the page
 * so that when they are clicked, their card expands into the full recipe view mode
 * @param {Element} recipeCard the <recipe-card> element you wish to bind the event
 *                             listeners to
 * @param {String} pageName the name of the page to navigate to on click
 */
function bindRecipeCard(recipeCard, pageName) {
  recipeCard.addEventListener('click', e => {
    // console.log(`Clicked on ${pageName}`);
    if (e.path[0].nodeName == 'A') return;
    router.navigate(pageName, false);
  });
}

/**
 * Binds the 'keydown' event listener to the Escape key (esc) such that when
 * it is clicked, the home page is returned to
 */
function bindEscKey () {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      router.navigate('home', false)
    }
  })
}
