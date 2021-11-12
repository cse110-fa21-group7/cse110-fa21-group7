function updateRecipe(id) {
    const recipe = findRecipe(id)

    const title = document.getElementById('recipeTitle')
    const ingredient1Name = document.getElementById('ingredient1name')
    const ingredient1Amount = document.getElementById('ingredient1amount')
    const step1 = document.getElementById('step1')

    title.value = recipe.title
    const ingredients = recipe.ingredients
    const ingredient1 = ingredients[0]
    ingredient1Name.value = ingredient1.name
    ingredient1Amount.value = ingredient1.amount

    const steps = recipe.steps
    const step1 = steps[0]
    step1.value = step1

    createRecipe()


}