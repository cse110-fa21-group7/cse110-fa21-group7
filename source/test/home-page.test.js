import { getRandom } from "../js/home-page.js";

test("Returns about-us for english language", () => {
  expect(getRandom(8)).toBe("/about-us");
});
