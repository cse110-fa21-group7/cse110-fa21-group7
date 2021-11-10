window.addEventListener('DOMContentLoaded', init)

async function init () {
  console.log('Init initialized')
  const recipe = JSON.parse(localStorage.getItem('recipe'))
  const recipeTitleElem = document.getElementById('recipeTitle')
  recipeTitleElem.innerText = recipe.title
  const ingredient1NameElem = document.getElementById('ingredient1name')
  ingredient1NameElem.innerText = recipe.ingredients[0].name
  // const ingredient2NameElem = document.getElementById('ingredient2name')
  // ingredient2NameElem.innerText = recipe.ingredients[1].name
  const step1Elem = document.getElementById('step1')
  step1Elem.innerText = recipe.steps[0]
}
