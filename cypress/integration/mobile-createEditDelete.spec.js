describe("Tests for create-edit-delete recipe", () => {
    before(() => {
        cy.visit("/create");
        cy.viewport("iphone-xr");
        cy.wait(500);
    
        cy.saveLocalStorage();
    });
  
    beforeEach(() => {
        cy.viewport("iphone-xr");
        cy.restoreLocalStorage();
        });
    afterEach(() => {
        cy.saveLocalStorage();
    });
  
    it("enter create recipe page", () => {
        cy.get('.hamburger > :nth-child(2)').click();
        cy.get('.mobile-nav > [href="/create"]').click();
    });

    it("input basic recipe info", () => {
        cy.get("#recipeTitle").type("recipe test");
        cy.get("#recipeDescription").type("recipe description");
        cy.get("#recipeCost").type("10 dollars");
        cy.get("#recipeTime").type("10");
        cy.get("#recipeServings").type("2");
    });

    it("input ingredients info", () => {
        // input ingredients
        cy.get(".ingredient-name input").eq(0).type("First Ingredient");
        cy.get(".ingredient-amount input").eq(0).type("1g");
        cy.get(".ingredient-name input").eq(1).type("Second Ingredient");
        cy.get(".ingredient-amount input").eq(1).type("2g");
        cy.get(".ingredient-name input").eq(2).type("Third Ingredient");
        cy.get(".ingredient-amount input").eq(2).type("3g");
        // input ingredent after click add
        cy.get("#add-ingredient").click();
        cy.get(".ingredient-name input").eq(3).type("Fourth Ingredient");
        cy.get(".ingredient-amount input").eq(3).type("4g");
        
      });
      it("input steps info", () => {
        // input steps
        cy.get(".step-sec textarea").eq(0).type("First Step");
        cy.get(".step-sec textarea").eq(1).type("Second Step");
    
        // input steps after click add
        cy.get("#add-step").click();
        cy.get("#add-step").click();
        cy.get(".step-sec textarea").eq(2).type("Third Step");
        cy.get(".step-sec textarea").eq(3).type("Fourth Step");

      });
      it("submit user recipe", () => {
        // submit
        cy.get(".btn-submit").click();
        cy.get("#confirm-button").click();
      });

      it("check recipe save in local storage or not", () => {
        cy.wait(2000);
        const currID = parseInt(localStorage.getItem("currID"));
        const userRecipes = JSON.parse(localStorage.getItem("userRecipes"));
        const recipe = userRecipes[currID];
        expect(recipe["title"]).to.eq("recipe test");
      });

      it("check recipe in our cookbook or not", () => {
        cy.get("recipe-card").shadow().contains("recipe test");
      });

      it("check created recipe info", () => {
        cy.get(".card").eq(0).shadow().find(".card-body ").click();
        cy.get("#recipe-title").contains("recipe test");
        cy.get("#recipe-desc").contains("recipe description");
        cy.get("#time").contains("10");
        cy.get("#servings").contains("2");
        cy.get("#cost").contains("Cost: $10");

        cy.contains("First Ingredient 1g");
        cy.contains("Second Ingredient 2g");
        cy.contains("Third Ingredient 3g");
        cy.contains("Fourth Ingredient 4g");

        cy.contains("First Step");
        cy.contains("Second Step");
        cy.contains("Third Step");
        cy.contains("Fourth Step");
        
      });

      it("edit recipe basic info", () => {
  
        cy.get(".recipe-body button").eq(0).click();
        cy.get("#recipeTitle").clear().type("edit test");
        cy.get("#recipeDescription").clear().type("edit recipe description");
        cy.get("#recipeCost").clear().type("11 dollars");
        cy.get("#recipeTime").clear().type("11");
        cy.get("#recipeServings").clear().type("3");

      });

      it("edit recipe ingredients", () => {
        cy.get(".ingredient-name input").eq(0).clear().type("Edit First Ingredient");
        cy.get(".ingredient-amount input").eq(0).clear().type("10g");
        cy.get(".ingredient-name input").eq(1).clear().type("Edit Second Ingredient");
        cy.get(".ingredient-amount input").eq(1).clear().type("20g");
        cy.get(".ingredient-name input").eq(2).clear().type("Edit Third Ingredient");
        cy.get(".ingredient-amount input").eq(2).clear().type("30g");
        // check remove ingredient
        cy.get("#remove-ingredient").click();
        
      });

      it("check edit steps functional", () => {
        // edit steps
        cy.get(".step-sec textarea").eq(0).clear().type("Edit First Step");
        cy.get(".step-sec textarea").eq(1).clear().type("Edit Second Step");
        cy.get(".step-sec textarea").eq(2).clear().type("Edit Third Step");
    
        // remove the last step 
        cy.get("#remove-step").click();
      });

      it("submit edited recipe", () => {
        // submit
        cy.get(".btn-submit").click();
        cy.get("#confirm-button").click();
      });

      it("check whether recipe is edited successfully", () => {
        // enter edited recipe 
        cy.get(".card").eq(0).shadow().find(".card-body ").click();

        // check edited information
        cy.get("#recipe-title").contains("edit test");
        cy.get("#recipe-desc").contains("edit recipe description");
        cy.get("#time").contains("11");
        cy.get("#servings").contains("3");
        cy.get("#cost").contains("Cost: $11");

        cy.get("#ingredient-list li").should("have.length",3);

        cy.contains("Edit First Ingredient 10g");
        cy.contains("Edit Second Ingredient 20g");
        cy.contains("Edit Third Ingredient 30g");
        
        cy.get("#step-list li").should("have.length",3);

        cy.contains("Edit First Step");
        cy.contains("Edit Second Step");
        cy.contains("Edit Third Step");
        
      });

      it("check delete recipe", () => {
        cy.get(".recipe-body button").eq(1).click();
        cy.get("#confirm-button").click();
        cy.get(".card").should("have.length",0);
      });

});