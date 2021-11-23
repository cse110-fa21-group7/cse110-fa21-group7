class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(data) {
    console.log(data);
    // const styleElem = document.createElement("style");
    // const styles = `
    //         * {
    //         }

    //         a {
    //         text-decoration: none;
    //         }
    //         a:hover {
    //         text-decoration: underline;
    //         }

    //         article {
    //         align-items: center;
    //         border: 5px solid #ecf8f5;
    //         border-radius: 8px;
    //         display: grid;
    //         grid-template-rows: 118px 56px 14px 18px 15px 36px;
    //         height: auto;
    //         row-gap: 10px;
    //         padding: 0 16px 16px 16px;
    //         width: 300px;
    //         }
    //         article:hover {
    //             border-radius: 8px;
    //             cursor: pointer;
    //             filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2));
    //             transition: all 0.2s ease;
    //             transform: scale(1.02);
    //           }
    //         div.rating {
    //         align-items: center;
    //         column-gap: 5px;
    //         display: flex;
    //         }

    //         div.rating > img {
    //         height: auto;
    //         display: inline-block;
    //         object-fit: scale-down;
    //         width: 78px;
    //         }
    //         article > img {
    //         border-top-left-radius: 8px;
    //         border-top-right-radius: 8px;
    //         height: 130px;
    //         object-fit: cover;
    //         margin-left: -16px;
    //         width: calc(100% + 32px);
    //         }
    //         p.ingredients {
    //         height: 32px;
    //         line-height: 16px;
    //         padding-top: 4px;
    //         overflow: hidden;
    //         }

    //         p.title {
    //         display: -webkit-box;
    //         font-size: 18px;
    //         height: 36px;
    //         line-height: 18px;
    //         overflow: hidden;
    //         -webkit-line-clamp: 2;
    //         -webkit-box-orient: vertical;
    //         }
    //         p:not(.title), span, time {
    //         color: #70757A;
    //         font-size: 12px;
    //         }
    //     `;

    // styleElem.innerHTML = styles;
  //   <div class="card">
  //   <div class="card__body">
  //     <img
  //       src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&webp=true&resize=300,272"
  //       alt="" class="card__image">
  //     <div class="add-to-cookbook">
  //       <a href="#"><i class="fa fa-plus"></i></a>
  //     </div>
  //     <h2 class="card__title">Chorizo & mozzarella gnocchi bake</h2>
  //     <ul class="info-row">
  //       <li>
  //         <i class="fa fa-clock-o" aria-hidden="true"></i>
  //         <span>35 min</span>
  //       </li>
  //       <li>
  //         <i class="fa fa-fire" aria-hidden="true"></i>
  //         <span>318 kcal </span>
  //       </li>
  //       <li><span class="dollar-rating">$$</span></li>
  //     </ul>
  //   </div>
  // </div>
    let cardBody = document.createElement('div');
    cardBody.classList.add('card__body');
    this.shadowRoot.append(cardBody);

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
    const li = document.createElement('li');
    const i = document.createElement('i');
    const span = document.createElement('span');
    span.innerHTML = '38 min'
    i.classList.add('fa')
    i.classList.add('fa-clock-o')
    i.ariaHidden = 'true';
    li.append(i, span)
    ul.appendChild(li);
    cardBody.appendChild(ul)
    // add total cost
    // const priceValue = Math.round(data["price"]);
    // const priceDiv = document.createElement("div");
    // if (priceValue) {
    //     rating.innerHTML = `
    //       <span>${priceValue}</span>
    //       <img src="assets/images/icons/${numStars}-star.svg" alt="${numStars} stars">
    //     `;
    //     if (ratingTotal) {
    //       rating.innerHTML += `<span>(${ratingTotal})</span>`;
    //     }
    //   } else {
    //     rating.innerHTML = `
    //       <span>No Reviews</span>
    //     `;
    //   }

    // const price = document.createElement("p");
    // price.classList.add("price");
    // // assume the user enters in terms of dollars - append a dollar sign to front
    // if (data['img-url'].includes('https://spoonacular.com')){
    // price.textContent = '$' + (data["totalCost"]/100).toFixed(2);
    // }
    // else{
    // price.textContent = '$' + data["totalCost"];
    // }
    // cardBody.appendChild(price);

    // // ingredients
    // const ingredients = document.createElement("p");
    // ingredients.classList.add("ingredients");
    // let ingredientsContent = "";
    // for (const each of data["ingredients"]) {
    //   ingredientsContent += each["name"] + "\n";
    // }
    // ingredients.textContent = ingredientsContent;
    // cardBody.appendChild(ingredients);
  }
}
customElements.define("recipe-card", RecipeCard);

