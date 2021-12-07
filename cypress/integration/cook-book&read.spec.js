describe("Tests for cookbook page", () => {
  before(() => {
    cy.visit("/cookbook");
    cy.wait(500);

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
    cy.get("#recipe-title").contains("This is for e2e test gnocchi bake");
    cy.get("#recipe-desc").contains("Upgrade cheesy tomato pasta with gnocchi");
    cy.contains("Cost: $10");
    cy.contains("olive oil");
    cy.contains("onion, finely chopped");
    cy.contains("garlic cloves , crushed");
    cy.contains("chorizo , diced");

    cy.contains("Heat the oil in a medium pan over a medium heat. Fry ");
    cy.contains(
      "Stir ¾ of the mozzarella and most of the basil through the gnocchi. "
    );
  });
});