// ReadRecipe.js

class ReadRecipe extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    // Create styles and root element
    const styles = document.createElement('style')
    const article = document.createElement('article')

    styles.innerHTML = `
      article {
          background-color: white;
      }
    `

    article.innerHTML = `
      <header>
        <div class="row">
          <div class="col-lg-12">
            <div class="page-header">
              <h2 id="forms">Read Recipe</h2>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div class="bs-docs-section">
          <div class="row">
            <div class="col-lg-6">
              <div class="bs-component">
                <div class="card mb-3">
                  <h3 class="card-header" id="recipeTitle"></h3>
                  <div class="card-body">
                    <h6 class="card-title" id="recipeDescription"></h6>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image</text>
                  </svg>
                  <ul class="list-group list-group-flush ingredients">
                    <li class="list-group-item" id="ingredient1name">Ingredient 1</li>
                    <li class="list-group-item" id="ingredient2name">Ingredient 2</li>
                  </ul>
                </div>
                <div class="card">
                  <div class="card-body instructions">
                    <h4 class="card-title">Steps</h4>
                    <div class="step-instruction">
                      <h6 class="card-subtitle mb-2">Step 1</h6>
                      <p class="card-text" id="step1">Step 1 instructions..</p>
                    </div>
                    <div class="step-instruction">
                      <h6 class="card-subtitle mb-2">Step 2</h6>
                      <p class="card-text" id="step2">Step 2 instructions..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>     
    `
    // Append elements to the shadow root
    this.shadowRoot.append(styles, article)

    /**
   * Sets the recipe that will be used inside the <recipe-expand> element.
   * Overwrites the previous recipe, fair warning.
   */
  set data(data) {
    this.json = data;

    // Reset HTML
    this.shadowRoot.querySelector('article').innerHTML = `
      <header>
        <div class="row">
          <div class="col-lg-12">
            <div class="page-header">
              <h2 id="forms">Read Recipe</h2>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div class="bs-docs-section">
          <div class="row">
            <div class="col-lg-6">
              <div class="bs-component">
                <div class="card mb-3">
                  <h3 class="card-header" id="recipeTitle"></h3>
                  <div class="card-body">
                    <h6 class="card-title" id="recipeDescription"></h6>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image</text>
                  </svg>
                  <ul class="list-group list-group-flush ingredients">
                    <li class="list-group-item" id="ingredient1name">Ingredient 1</li>
                    <li class="list-group-item" id="ingredient2name">Ingredient 2</li>
                  </ul>
                </div>
                <div class="card">
                  <div class="card-body instructions">
                    <h4 class="card-title">Steps</h4>
                    <div class="step-instruction">
                      <h6 class="card-subtitle mb-2">Step 1</h6>
                      <p class="card-text" id="step1">Step 1 instructions..</p>
                    </div>
                    <div class="step-instruction">
                      <h6 class="card-subtitle mb-2">Step 2</h6>
                      <p class="card-text" id="step2">Step 2 instructions..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    `;

    // Set Title
    const title = getTitle(data).toUpperCase();
    this.shadowRoot.querySelector('header > h1').innerHTML = title;

    // Set the Servings yield
    const servingsYield = getYield(data);
    this.shadowRoot.querySelector('.meta--yield').innerHTML = servingsYield;

    // Set the total time
    const totalTime = convertTime(searchForKey(data, 'totalTime'));
    this.shadowRoot.querySelector('.meta--total-time').innerHTML = totalTime;

    // Set Categories
    const categories = getCategories(data);
    this.shadowRoot.querySelector('.meta--categories').innerHTML = categories;

    // Set Description
    const description = getDescription(data);
    this.shadowRoot.querySelector('p.description').innerHTML = description;

    // Set Image
    const imgSrc = getImage(data);
    const img = this.shadowRoot.querySelector('img.thumbnail');
    img.setAttribute('src', imgSrc);
    img.setAttribute('alt', title);

    // Set Ratings
    const ratingVal = searchForKey(data, 'ratingValue');
    let ratingTotal = searchForKey(data, 'ratingCount');
    const rating = this.shadowRoot.querySelector('.rating--wrapper');
    const numStars = Math.round(ratingVal);
    if (ratingVal) {
      rating.innerHTML = `
      <img src="assets/images/icons/${numStars}-star.svg" alt="${numStars} stars">
      <span>${ratingVal}</span>
      from
      `;
      if (!ratingTotal) {
        ratingTotal = 'some';
      }
      rating.innerHTML += `<span class="rating-total">${ratingTotal} votes</span>`;
    } else {
      rating.innerHTML = `
        <span>No Reviews</span>
      `;
    }

    // Set Ingredients
    const ingredients = getIngredients(data);
    ingredients.forEach(ingredient => {
      const listItem = document.createElement('li');
      listItem.innerHTML = ingredient;
      this.shadowRoot.querySelector('.section--ingredients > ul').append(listItem);
    });

    // Set Instructions
    const instructions = getInstructions(data);
    instructions.forEach(instruction => {
      const listItem = document.createElement('li');
      listItem.innerHTML = instruction;
      this.shadowRoot.querySelector('.section--instructions > ol').append(listItem);
    });
  };

  /**
   * Returns the object of the currect recipe being used.
   */
  get data() {
    return this.json;
  }
    
  }
}

customElements.define('read-recipe', ReadRecipe);