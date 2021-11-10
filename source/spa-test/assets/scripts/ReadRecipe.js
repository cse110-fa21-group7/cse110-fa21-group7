// ReadRecipe.js

class ReadRecipe extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    // Create styles and root element
    const styles = document.createElement('style')
    const article = document.createElement('container')

    styles.innerHTML = `
      article {
          background-color: white;
      }
    `
    article.innertHTML = `
    
    
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
        <h1></h1>
        <div class="meta--wrapper">
          <p>yield: <span class="meta--yield"></span></p>
          <p>total time: <time class="meta--total-time"></time></p>
          <p>categories: <span class="meta--categories"></span></p>
        </div>
        <p class="description"></p>
        <img src="" alt="" class="thumbnail" />
      </header>
      <main>
        <div class="rating--wrapper">
          <span class="rating--value"></span>
          <img src="" alt="" class="rating--star-img" />
          <span class="rating--total"></span>
        </div>
        <section class="section--ingredients">
          <h2>INGREDIENTS</h2>
          <ul></ul>
        </section>
        <section class="section--instructions">
          <h2>INSTRUCTIONS</h2>
          <ol></ol>
        </section>
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
  }

  /**
   * Returns the object of the currect recipe being used.
   */
  get data() {
    return this.json;
  }
    
  }
}

