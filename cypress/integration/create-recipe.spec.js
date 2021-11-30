/// <reference types="cypress" />

describe("Tests for create recipe", () => {
  beforeEach(() => {
    cy.visit("/source/html/create-recipe.html");
  });

  it("enter the create recipe", () => {
    cy.get("#forms").contains("Create Recipe Form");
  });

  it("create recipe test1", () => {
    // create a recipe
    cy.get("#recipeTitle").type("Apple");
    cy.get("#recipeDescription").type("This is an apple recipe");
    cy.get("#recipeCost").type("10 dollars");
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
    // input steps
    cy.get(".step-sec textarea").eq(0).type("First Step");
    cy.get(".step-sec textarea").eq(1).type("Second Step");

    // input steps after click add
    cy.get("#add-step").click();
    cy.get("#add-step").click();
    cy.get(".step-sec textarea").eq(2).type("Third Step");
    cy.get(".step-sec textarea").eq(3).type("Fourth Step");

    // submit
    
    cy.get(".btn-submit").click();
    

    // Check wheter create recipe successfully

    cy.visit("/source/html/cook-book.html");
    cy.get("recipe-card").eq(2).shadow().find(".card .card_body .card__title").contains("Apple");
    
    cy.get("recipe-card").eq(2).click();
    cy.get("#recipeTitle").contains("Apple");
    cy.get("#recipeDescription").contains("This is an apple recipe");
    cy.get(".cost > :nth-child(2)").contains("Cost: $10");
    cy.get(":nth-child(1) > .container").contains("First Ingredient 1g");
    cy.get(":nth-child(2) > .container").contains("Second Ingredient 2g");
    cy.get(":nth-child(3) > .container").contains("Third Ingredient 3g");
    cy.get(":nth-child(4) > .container").contains("Fourth Ingredient 4g");

    cy.get(".orderList > :nth-child(1)").contains("First Step");
    cy.get(".orderList > :nth-child(2)").contains("Second Step");
    cy.get(".orderList > :nth-child(3)").contains("Third Step");
    cy.get(".orderList > :nth-child(4)").contains("Fourth Step");

  });
});
