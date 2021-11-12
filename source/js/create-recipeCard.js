class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set data(data) {
        const styleElem = document.createElement('style');
        const styles = `
            * {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            }

            a {
            text-decoration: none;
            }
            a:hover {
            text-decoration: underline;
            }

            article {
            align-items: center;
            border: 1px solid rgb(223, 225, 229);
            border-radius: 8px;
            display: grid;
            grid-template-rows: 118px 56px 14px 18px 15px 36px;
            height: auto;
            row-gap: 5px;
            padding: 0 16px 16px 16px;
            width: 178px;
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
            height: 118px;
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

            p.organization {
            color: black !important;
            }
            p.title {
            display: -webkit-box;
            font-size: 16px;
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
        
        // ---------------need fix later!------
        // Wait for add img link. Cannot save img in local
        let img = document.createElement('img');
        img.setAttribute('src', '../recipe-img-example/recipe_' + Math.floor(Math.random() * 3) + '.jpg');
        img.setAttribute('alt', data);
        card.appendChild(img)

        // add title
        let title = document.createElement('p');
        title.classList.add('title');
        // if the recipe is from internet, we can add this 
        let titleLink = document.createElement('a');
        titleLink.setAttribute('href', 'home.html');
        titleLink.textContent = data['title'];

        card.appendChild(title.appendChild(titleLink));
   
        // add total cost
        let price = document.createElement('p');
        price.textContent = 'Show a total cost here';
        card.appendChild(price)

        // ingredients
        let ingredients = document.createElement('p');
        ingredients.classList.add('ingredients');
        let ingredientsContent = '';
        for(let each of data['ingredients']) {
            ingredientsContent += each['name']
        }
        ingredients.textContent = ingredientsContent;
        card.appendChild(ingredients);
  
    }
}
customElements.define('recipe-card', RecipeCard);