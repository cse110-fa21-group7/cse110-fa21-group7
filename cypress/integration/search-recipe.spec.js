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
  it("check search function", () => {
    cy.get("#query").type("apple");
    cy.get("#search-button").click();
    cy.url().should("include", "/result");
  });
  it("check results", () => {
    cy.get(".results").find("recipe-card").should("have.length", 12);
  });
  it("add recipe to cookbook", () => {
    for (let i = 0; i < 12; i++) {
      cy.get(".card")
        .eq(i)
        .shadow()
        .find(".card-body .add-to-cookbook #card-btn")
        .click();
      cy.wait(500);
      cy.get("#confirm-button").click();
    }
  });

  it("click next page", () => {
    cy.get("#next").click();
    cy.wait(1000);
    for (let i = 0; i < 12; i++) {
      cy.get(".card").eq(i).shadow().find("#card-btn").click();
      cy.wait(500);
      cy.get("#confirm-button").click();
    }
    cy.wait(1500);
    cy.visit("/cookbook").then(() => {
      cy.get("recipe-card").should("have.length", 24);
    });
  });
});
