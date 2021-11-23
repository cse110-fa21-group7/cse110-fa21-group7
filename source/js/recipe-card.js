class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(data) {
    console.log(data);
    const styleElem = document.createElement("style");
    const styles = `

    .card {
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
      
    
    
      /* // &__btn {
      //   padding: 1rem;
      //   font-family: inherit;
      //   font-weight: bold;
      //   font-size: 1rem;
      //   margin: 1rem;
      //   border: 2px solid var(--clr-primary);
      //   background: transparent;
      //   color: var(--clr-primary);
      //   border-radius: var(--radius);
      //   transition: background 200ms ease-in, color 200ms ease-in;
      // }
    
      // &:hover &__btn {
      //   background: var(--clr-primary);
      //   color: white;
      // } */
    }
    
    .card__image {
        height: 12rem;
        width: 100%;
        object-fit: cover;
      }
    
    .card__title {
        padding: 1rem;
      }
    
    .card__description {
        padding: 1rem 1rem;
      }
    
    .card:hover {
        transform: scale(1.02);
     }
    
     .card__body {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
            line-height: 1em; }
    
    .info-row li span {
      margin-left: 0.5em;
              font-weight: 300;
              vertical-align: middle;
              color: #838689;
    }
    
    .add-to-cookbook a .fa-plus {
          background: #57abf2;
          border-radius: 50%;
          position: absolute;
          top: 10.75rem;
          right: 10%;
          width: 2.5rem;
          height: 2.5rem;
          text-align: center;
          color: white;
          font-size: 1.3rem;
          padding: 0.6rem 0.52rem;
    }`;

    styleElem.innerHTML = styles;
    const cardDiv = document.createElement("div");
    cardDiv.classList.add('card');
    const cardBody = document.createElement("div");
    cardBody.classList.add('card_body');
    
    this.shadowRoot.append(styleElem, cardDiv);
    cardDiv.appendChild(cardBody);
    

    // add img
    const img = document.createElement("img");
    img.setAttribute("src", data["img-url"]);
    img.setAttribute("alt", data['title']);
    img.classList.add('card__image');
    cardBody.appendChild(img);

    // add title
    const title = document.createElement("h2");
    title.textContent = data["title"];
    title.classList.add("card__title");
    cardBody.appendChild(title);

    // add info list
    const ul = document.createElement('ul');
    ul.classList.add('info-row');
    // 

    // li.append(i, span)
    ul.appendChild(addList('38 min'));
    // add kcal
    ul.appendChild(addList('318 kcal'));

    // add total cost
    let price;
    // assume the user enters in terms of dollars - append a dollar sign to front
    if (data['img-url'].includes('https://spoonacular.com')){
    price = '$' + (data["totalCost"]/100).toFixed(2);
    }
    else{
    price = '$' + data["totalCost"];
    }
    ul.appendChild(addList(price));
    cardBody.appendChild(ul)

  }
}
customElements.define("recipe-card", RecipeCard);

function addList(value) {
  // symbol does not work need to ask Kunal how to fix 
    // const i = document.createElement('i');
    // const span = document.createElement('span');
    // span.innerHTML = '38 min'

  const li = document.createElement('li');
    const i = document.createElement('i');

      i.classList.add('fa')
    i.classList.add('fa-clock-o')
    i.ariaHidden = 'true';
  
  const span = document.createElement('span');
  span.innerHTML = value;

  li.appendChild(i);
  li.appendChild(span);
  return li;
}