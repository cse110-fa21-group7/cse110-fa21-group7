describe("Tests for mobile version view", () => {
  before(() => {
    cy.visit("/");
    cy.wait(500);
    cy.viewport("iphone-xr");

    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("check mobile version nav bar", () => {
    // enter cook book page
    cy.get(".hamburger > :nth-child(2)").click();
    cy.get('.mobile-nav > [href="/cookbook"]').click();
    cy.url().should("include", "/cookbook");
    cy.wait(500);
    // enter create recipe page
    cy.get(".hamburger > :nth-child(2)").click();
    cy.get('.mobile-nav > [href="/create"]').click();
    cy.url().should("include", "/create");
    cy.wait(500);
    // go back to home page
    cy.get(".hamburger > :nth-child(2)").click();
    cy.get(".mobile-nav > a").eq(0).click();
    cy.url().should("include", "/");
    cy.url().should("not.include", "/cookbook");
    cy.url().should("not.include", "/create");
  });
});
