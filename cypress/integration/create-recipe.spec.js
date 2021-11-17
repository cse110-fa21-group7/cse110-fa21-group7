/// <reference types="cypress" />

describe("Tests for create recipe", () => {
  beforeEach(() => {
    cy.visit("/source/html/create-recipe.html");
  });

  it("enter the create recipe", () => {
    cy.get("#forms").contains("Create Recipe Form");
  });
});
