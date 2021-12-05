describe("Tests for curated list", () => {
  before(() => {
    cy.visit("/");
    cy.wait(500);

    cy.saveLocalStorage();
  });
  it("check add button", () => {
    cy.get(".card")
      .eq(2)
      .shadow()
      .find(".card-body .add-to-cookbook i")
      .click();
  });
});
