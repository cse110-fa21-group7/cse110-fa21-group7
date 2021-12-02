/**
 * Get recipes from localStorage
 *
 */
class RecipeCard extends HTMLElement {
  /**
   * Get recipes from localStorage
   *
   */
  constructor() {
    super();
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
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      box-shadow: 0px 2px 20px #cfd8dc;
      border-radius: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: transform 200ms ease-in;
      background-color: #fff;
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
    
    .fa-plus {
      display: inline-block;
      background: #57abf2;
      border-radius: 50%;
      position: absolute;
      top: 10.75rem;
      right: 5%;
      width: 2.3rem;
      height: 2.3rem;
      text-align: center;
      padding: 0px;
      color: white;
      font-size: 1.5rem;
      margin:0 auto;
      padding-top: 5px;
      // padding: 0.6rem 0.52rem;
    }`;

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
    // test add btn
    const addBtn = document.createElement("div");
    addBtn.classList.add("add-to-cookbook");

    const ii = document.createElement("i");
    ii.classList.add("fa");
    ii.ariaHidden = "true";
    if (this.page === "cookbook") {
      ii.classList.add("fa-trash");
    } else {
      ii.classList.add("fa-plus");
    }
    addBtn.appendChild(ii);
    cardBody.appendChild(addBtn);

    // add title
    const title = document.createElement("h2");
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
