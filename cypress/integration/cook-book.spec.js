/**
 * check current recipe title exist in our cookbook or not
 * @param {String} title
 */
export function checkRecipeExist(title) {
  cy.visit("/cookbook");
}
