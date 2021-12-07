describe("Tests for curated list", () => {
    before(() => {
      cy.visit("/");
      cy.wait(500);
  
      cy.saveLocalStorage();
    });
  
    beforeEach(() => {
      cy.restoreLocalStorage();
    });
    afterEach(() => {
      cy.saveLocalStorage();
    });
  
    // it("check number of recipes", () => {
    //   cy.get("recipe-card").should("have.length", 4);
    // });
  
    it("check add recipe", () => {
      // add recipe
      cy.get(".card")
      .eq(2)       
      .shadow()
      .find(".card-body ")
      .click();

      cy.get(".recipe-body button").eq(0).click();
  
    });

    it("check edit recipe", () => {
        cy.visit("/cookbook");
        
        cy.get(".card")
        .eq(0)       
        .shadow()
        .find(".card-body ")
        .click();
  
        cy.get(".recipe-body button").eq(0).click();
        cy.get("#recipeTitle").clear().type("recipe test");
        cy.get("#recipeDescription").clear().type("recipe description");
        cy.get("#recipeCost").clear().type("10 dollars");
        cy.get("#recipeTime").clear().type("10");
        cy.get("#recipeServings").clear().type("2");
        
    
      });

      it("check edit ingredients functional", () => {
        cy.get(".ingredient-name input").eq(0).clear().type("First Ingredient");
        cy.get(".ingredient-amount input").eq(0).clear().type("1g");
        cy.get(".ingredient-name input").eq(1).clear().type("Second Ingredient");
        cy.get(".ingredient-amount input").eq(1).clear().type("2g");
        cy.get(".ingredient-name input").eq(2).clear().type("Third Ingredient");
        cy.get(".ingredient-amount input").eq(2).clear().type("3g");
        // check remove ingredient
        cy.get("#remove-ingredient").click();
        // check add ingredient
        cy.get("#add-ingredient").click();
        // edit the ingredient that we just added
        cy.get(".ingredient-name input").eq(-1).clear().type("Last Ingredient");
        cy.get(".ingredient-amount input").eq(-1).clear().type("4g");
      });

      it("check edit steps functional", () => {
        // edit steps
        cy.get(".step-sec textarea").eq(0).clear().type("First Step");
    
        // remove the last step and then add a new step
        cy.get("#remove-step").click();
        cy.get("#add-step").click();
        cy.get(".step-sec textarea").eq(-1).clear().type("Last Step");
        
      });

      it("submit edited recipe", () => {
        // submit
        cy.get(".btn-submit").click();
        cy.get("#confirm-button").click();
      });

      it("check whether recipe is edited successfully", () => {
        // enter edited recipe 
        cy.get(".card")
        .eq(0)       
        .shadow()
        .find(".card-body ")
        .click();

        // check edited information
        
        cy.get("#recipe-title").contains("recipe test");
        cy.get("#recipe-desc").contains("recipe description");
        cy.contains("Cost: $10");
        cy.contains("10 minutes");
        cy.contains("Servings: 2");
        cy.contains("First Ingredient 1g");
        cy.contains("Second Ingredient 2g");
        cy.contains("Third Ingredient 3g");
        cy.contains("Last Ingredient 4g");

        cy.contains("First Step");
        cy.contains("Last Step");
      });

      it("check delete recipe", () => {
        cy.get(".recipe-body button").eq(1).click();
        cy.get("#confirm-button").click();
        cy.get(".card").should("have.length",0);
      });



  });
  