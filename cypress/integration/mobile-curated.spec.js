describe("Tests for curated list for mobile version", () => {
  before(() => {
    cy.visit("/");
    cy.wait(500);
    cy.viewport("iphone-xr");

    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.viewport("iphone-xr");
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
    cy.get(".hamburger > :nth-child(2)").click();
    cy.get('.mobile-nav > [href="/cookbook"]').click();
    cy.get("recipe-card").should("have.length", 12);
  });
});
