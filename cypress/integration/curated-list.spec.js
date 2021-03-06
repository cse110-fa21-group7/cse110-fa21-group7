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

  it("check number of recipes", () => {
    cy.get("recipe-card").should("have.length", 12);
  });

  it("check add button", () => {
    // add recipe
    for (let i = 0; i < 12; i++) {
      cy.get(".card")
        .eq(i)
        .shadow()
        .find(".card-body .add-to-cookbook i")
        .click();
    }

    // after adding recipe to cookbook, check cookbook
    cy.visit("/cookbook");
    cy.get("recipe-card").should("have.length", 12);
  });
});
