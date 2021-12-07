describe("Tests for cookbook page", () => {
  before(() => {
    cy.visit("/cookbook");
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });
  it("enter cookbook page", () => {
    // add example recipe object to localstorage
    const userRecipes = JSON.parse(localStorage.getItem("userRecipes"));
    cy.fixture("recipe").then((recipe) => {
      userRecipes["0"] = recipe["0"];
      console.log(userRecipes);
      cy.setLocalStorage("userRecipes", JSON.stringify(userRecipes));
    });
    cy.visit("/cookbook");
    cy.wait(500);
    cy.get(".title-div").find("p").contains("Here are your recipes.");
  });
  it("check example recipe in our cookbook or not", () => {
    cy.get("recipe-card")
      .shadow()
      .contains("This is for e2e test gnocchi bake");
  });
  it("enter read recipe page check info", () => {
    cy.get("recipe-card")
      .shadow()
      .contains("This is for e2e test gnocchi bake")
      .click();
    cy.get("#recipeTitle").contains("This is for e2e test gnocchi bake");
    cy.get("#recipeDescription").contains(
      "Upgrade cheesy tomato pasta with gnocchi"
    );
    cy.get(".cost > :nth-child(2)").contains("Cost: $10");
    cy.get(":nth-child(1) > .container").contains("olive oil");
    cy.get(":nth-child(2) > .container").contains("onion, finely chopped");
    cy.get(":nth-child(3) > .container").contains("garlic cloves , crushed");
    cy.get(":nth-child(4) > .container").contains("chorizo , diced");

    cy.get(".orderList > :nth-child(1)").contains(
      "Heat the oil in a medium pan over a medium heat. Fry "
    );
    cy.get(".orderList > :nth-child(2)").contains(
      "Stir ¾ of the mozzarella and most of the basil through the gnocchi. "
    );
  });
});
/// <reference types="Cypress" />
describe('Tests for cookbook page2', function () {
 before(() => {
    cy.visit("/cookbook");
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Tests for  page click', () => {
    cy.get('.dropdown').should('exist')
    cy.get('#ASAP-logo-home').click()
    cy.get('#link-cookbook').click()
    cy.get('#link-create-recipe').click()
    cy.get('#link-create-recipe').click({ force: true } )
    cy.get('#link-cookbook').click({ force: true } )
    cy.get('#ASAP-logo-home').click({ force: true } )
    cy.get("#ASAP-logo-home").dblclick()
    cy.get("#link-cookbook").dblclick()
    cy.get("#link-create-recipe").dblclick()
    cy.get("#ASAP-logo-home").rightclick()
    cy.get("#link-cookbook").rightclick()
    cy.get("#link-create-recipe").rightclick()
    cy.get("#ASAP-logo-home").rightclick()
    cy.get("#link-cookbook").rightclick()
    cy.get("#link-create-recipe").rightclick()
    cy.get('#link-create-recipe').click({multiple : true }  )
    cy.get('#link-cookbook').click({multiple : true }  )
    cy.get('#ASAP-logo-home').click({multiple : true }  )   
  })
  
  it('test2',()=>{
     cy.get('#link-cookbook').contains(
      "Cookbook"
    );
    cy.get('#link-create-recipe').contains(
      "Create"
    );
  })
})