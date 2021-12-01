describe("Tests for curated list", () => {
  before(() => {
    cy.visit("/");
    cy.wait(500);

    cy.saveLocalStorage();
  });
});
