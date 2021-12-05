describe("Tests for search&result page", () => {
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
  // it("check search function", () => {
  //   cy.get("#query").type("apple");
  //   cy.get("#search-button").click();
  //   cy.url().should("include", "/result");
  // });
  // it("check results", () => {
  //   cy.get(".results").find("recipe-card").should("have.length", 12);
  // });
  it("add recipe to cookbook", () => {
    cy.get(".card").eq(2).shadow().find("#card-btn").click();
    cy.wait(1500);
    cy.get(".card")
      .eq(2)
      .shadow()
      .find(".card-title")
      .invoke("text")
      .then((recipe) => {
        cy.visit("/cookbook");
        cy.get("recipe-card").shadow().contains(recipe);
      });
  });
});
