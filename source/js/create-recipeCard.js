class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set data(data) {
        const styleElem = document.createElement('style');
        const styles = `
            * {
            }

            a {
            text-decoration: none;
            }
            a:hover {
            text-decoration: underline;
            }

            article {
            align-items: center;
            border: 5px solid #ecf8f5;
            border-radius: 8px;
            display: grid;
            grid-template-rows: 118px 56px 14px 18px 15px 36px;
            height: auto;
            row-gap: 10px;
            padding: 0 16px 16px 16px;
            width: 300px;
            }
            article:hover {
                border-radius: 8px;
                cursor: pointer;
                filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2));
                transition: all 0.2s ease;
                transform: scale(1.02);
              }
            div.rating {
            align-items: center;
            column-gap: 5px;
            display: flex;
            }

            div.rating > img {
            height: auto;
            display: inline-block;
            object-fit: scale-down;
            width: 78px;
            }
            article > img {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            height: 130px;
            object-fit: cover;
            margin-left: -16px;
            width: calc(100% + 32px);
            }
            p.ingredients {
            height: 32px;
            line-height: 16px;
            padding-top: 4px;
            overflow: hidden;
            }

            p.title {
            display: -webkit-box;
            font-size: 18px;
            height: 36px;
            line-height: 18px;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            }
            p:not(.title), span, time {
            color: #70757A;
            font-size: 12px;
            }
        `;

        styleElem.innerHTML = styles;
        let card = document.createElement('article');
        this.shadowRoot.append(styleElem, card);
        // add id for each recipe
        card.id = data['id'];
        // ---------------need fix later!------
        // Wait for add img link. Cannot save img in local
        let img = document.createElement('img');
        img.setAttribute('src', '../recipe-img-example/recipe_' + Math.floor(Math.random() * 3) + '.jpg');
        img.setAttribute('alt', data);
        card.appendChild(img)

        // add title
        let title = document.createElement('p');
        title.textContent = data['title']
        title.classList.add('title');

        card.appendChild(title);
   
        // add total cost
        const priceValue = Math.round(data['price']);
        let priceDiv = document.createElement('div');
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
        
        let price = document.createElement('p');
        price.classList.add('price')
        price.textContent = data['totalCost'];
        card.appendChild(price)

        // ingredients
        let ingredients = document.createElement('p');
        ingredients.classList.add('ingredients');
        let ingredientsContent = '';
        for(let each of data['ingredients']) {
            ingredientsContent += each['name'] + '\n';
        }
        ingredients.textContent = ingredientsContent;
        card.appendChild(ingredients);
  
    }
}
customElements.define('recipe-card', RecipeCard);