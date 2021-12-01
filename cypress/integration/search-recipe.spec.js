describe("Tests for search&result page", () => {
  before(() => {
    cy.visit("/read");
    cy.wait(500);

    cy.saveLocalStorage();
  });
});
