/// <reference types="cypress" />
import { checkRecipeExist } from "./cook-book.spec.js";
describe("Tests for create recipe", () => {
  before(() => {
    cy.visit("/create");
    cy.wait(500);
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });
  it("enter create recipe page", () => {
    cy.get("#forms").contains("Create Recipe Form");
  });

  it("check basic input", () => {
    // create a recipe
    cy.get("#recipeTitle").type("e2e Apple");
    cy.get("#recipeDescription").type("This is an apple recipe");
    cy.get("#recipeCost").type("10 dollars");

    // cy.get("recipe-card").eq(2).click();
    // cy.get("#recipeTitle").contains("Apple");
    // cy.get("#recipeDescription").contains("This is an apple recipe");
    // cy.get(".cost > :nth-child(2)").contains("Cost: $10");
    // cy.get(":nth-child(1) > .container").contains("First Ingredient 1g");
    // cy.get(":nth-child(2) > .container").contains("Second Ingredient 2g");
    // cy.get(":nth-child(3) > .container").contains("Third Ingredient 3g");
    // cy.get(":nth-child(4) > .container").contains("Fourth Ingredient 4g");

    // cy.get(".orderList > :nth-child(1)").contains("First Step");
    // cy.get(".orderList > :nth-child(2)").contains("Second Step");
    // cy.get(".orderList > :nth-child(3)").contains("Third Step");
    // cy.get(".orderList > :nth-child(4)").contains("Fourth Step");
  });
  // it("check image uplad or not", () => {
  //   const filepath = "default.png";
  //   cy.get("#recipeImage").attachFile(filepath);
  //   cy.get("#img-spot")
  //     .find("img")
  //     .should("have.attr", "src")
  //     .should("include", "imgur");
  // });
  it("check ingredients functional", () => {
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
    // check remove one ingredent
    cy.get("#remove-ingredient").click();
    cy.get("#ingredients").find(".ingredient").should("have.length", 3);
    // expect("").to.have.length(3);
  });
  it("check steps functional", () => {
    // input steps
    cy.get(".step-sec textarea").eq(0).type("First Step");
    cy.get(".step-sec textarea").eq(1).type("Second Step");

    // input steps after click add
    cy.get("#add-step").click();
    cy.get("#add-step").click();
    cy.get(".step-sec textarea").eq(2).type("Third Step");
    cy.get(".step-sec textarea").eq(3).type("Fourth Step");
    // check remove one step

    cy.get("#remove-step").click();
    cy.get("#steps").find(".step-sec").should("have.length", 3);
  });
  it("submit user recipe", () => {
    // submit
    cy.get(".btn-submit").click();
  });
  it("check recipe save in local storage or not", () => {
    cy.wait(2000);
    const currID = parseInt(localStorage.getItem("currID"));
    const userRecipes = JSON.parse(localStorage.getItem("userRecipes"));
    const recipe = userRecipes[currID];
    expect(recipe["title"]).to.eq("e2e Apple");
  });
  it("check recipe in our cookbook or not", () => {
    cy.get("recipe-card")
      .eq(2)
      .shadow()
      .find(".card .card_body .card__title")
      .contains("e2e Apple");
  });
});
