/**
 * Get recipes from localStorage
 * Then create recipe card based on these recipes
 */
class RecipeCard extends HTMLElement {
  /**
   * Get recipes from localStorage
   *
   */
  constructor() {
    super();
    this.flag = false;
    this.attachShadow({
      mode: "open",
    }).innerHTML = `<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">`;
  }

  /**
   * Set the page name of the recipe card
   * @param {string} page
   */
  setPage(page) {
    this.page = page;
  }
  /**
   * save current recipe object which we get from local storage
   * @param {JSON} recipes
   */
  setRecipes(recipes) {
    this.recipes = recipes;
  }
  /**
   * save id to recipe card class
   * @param {string} id
   */
  setID(id) {
    this.id = id;
  }
  /**
   * Get recipes from localStorage
   * @param {HTMLElement} data
   */
  set data(data) {
    // console.log(data);
    const styleElem = document.createElement("style");
    const styles = `
    .card-image {
      height: 12rem;
      width: 100%;
      object-fit: cover;
    }
    
    .card-title {
      padding: 1rem;
    }
    
    .card-body {
      font-family: Snell Roundhand;
      font-size:20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      box-shadow: 0px 2px 20px var(card-shadow-color);
      border-radius: 0.3rem;
      border:var(--is-solid);
      border-color:var(--border-color);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: transform 200ms ease-in;
      background-color: var(--card-bg-color);
      position: relative;
    }
    .card-body:hover {
      transform: scale(1.02);
    }
    ul.info-row {
      list-style: none;
      margin: 0.5em auto;
      padding: 0;
      vertical-align: bottom;
    }
    
    .info-row li {
      display: inline-block;
      margin-left: 1em;
      line-height: 1em;
    }
    
    .info-row li span {
      margin-left: 0.5em;
      font-weight: 300;
      vertical-align: middle;
      color: #838689;
    }
    #card-btn {
      display: inline-block;
      line-height: 35px;
      background: #57abf2;
      border-radius: 50%;
      position: absolute;
      top: 10.75rem;
      right: 5%;
      width: 2.3em;
      height: 2.3em;
      text-align: center;
      padding: 0px;
      color: white;
    }
    #card-btn:hover{
      background: rgb(226, 100, 125);
    }
    `;

    styleElem.innerHTML = styles;
    // const cardDiv = document.createElement("div");
    // cardDiv.classList.add("card");
    this.classList.add("card");
    const cardBody = document.createElement("div");
    this.shadowRoot.append(styleElem, cardBody);

    cardBody.classList.add("card-body");

    // cardDiv.appendChild(cardBody);

    // add img
    const img = document.createElement("img");
    img.setAttribute("src", data["image"]);
    img.setAttribute("alt", data["title"]);
    img.classList.add("card-image");
    cardBody.appendChild(img);
    // add btn, so we can add current recipe to user cookbook
    const addBtn = document.createElement("div");
    addBtn.classList.add("add-to-cookbook");
    const ii = document.createElement("i");
    ii.id = "card-btn";
    ii.classList.add("fa");
    ii.classList.add("fa-plus");
    ii.ariaHidden = "true";
    addBtn.appendChild(ii);
    cardBody.appendChild(addBtn);
    // if the id in user's cookbook, we do not need to show the button
    if (this.id in this.recipes) cardBody.removeChild(addBtn);
    // if user click btn
    ii.addEventListener("click", (e) => {
      e.preventDefault();
      this.flag = true;
      cardBody.removeChild(addBtn);
      // Display pop-up boxes
      modal.classList.add("active");
      // ii.style.display = "hidden";
    });

    const closeBtn = document.querySelector("#confirm-button");
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    // add title
    const title = document.createElement("h3");
    title.textContent = data["title"];
    title.classList.add("card-title");
    cardBody.appendChild(title);

    if (this.page == "curatedList" || this.page == "cookbook") {
      // add info list
      const ul = document.createElement("ul");
      ul.classList.add("info-row");
      // append time
      ul.appendChild(addList("fa-clock-o", `${data["time"]} mins`));
      // append servings
      ul.appendChild(addList("fa-user", data["servings"]));
      // add total cost
      ul.appendChild(addList("cost", `$ ${data["totalCost"]}`));
      cardBody.appendChild(ul);
    }
  }
}
customElements.define("recipe-card", RecipeCard);
/**
 * Get recipes from localStorage
 * @param {string} classNmae
 * @param {string} value
 * @return {HTMLElement}
 */
function addList(classNmae, value) {
  // symbol does not work need to ask Kunal how to fix
  // const i = document.createElement('i');
  // const span = document.createElement('span');
  // span.innerHTML = '38 min'

  const li = document.createElement("li");
  const i = document.createElement("i");

  i.classList.add("fa");
  i.classList.add(classNmae);
  i.ariaHidden = "true";

  const span = document.createElement("span");
  span.innerHTML = value;

  li.appendChild(i);
  li.appendChild(span);
  return li;
}
