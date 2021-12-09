import { getRandom } from "../js/home-page.js";

test("Returns about-us for english language", () => {
  const resultArray = getRandom(36);
  expect(resultArray.length).toBe(8);
});
