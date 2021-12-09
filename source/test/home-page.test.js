import { getRandom } from "../js/home-page.js";
import { dictToArr } from "../js/home-page.js";
import { createCaurtedList } from "../js/home-page.js";

describe("test getRandom", () => {
  test("test getRandom returns correct length", () => {
    const resultArray = getRandom(36);
    expect(resultArray.length).toBe(12);
  });
  
  test("getRandom return non-duplicated items", () => {
    let exist = [];
    const resultArray = getRandom(40);
    resultArray.forEach((e) => {
      expect(exist[e]).toBe(undefined);
      exist[e] = true;
    });
  })
})

describe("test dictToArr", () => {
  let dict = {"1": "hello", "2":"world"};
  let arr = [["1", "hello"], ["2", "world"]];
  test("test convert dictionary to array function", () => {
      expect(dictToArr(dict)).toStrictEqual(arr);
  });
});

describe("test createCuratedlist function", () => {
  test("test if the length is correct", () => {
    let tempStored = {}
    for(let i = 1; i <= 31; i++) {
      tempStored[i] = i;
    }
    window.localStorage.setItem("storedRecipes", JSON.stringify(tempStored));
    expect(Object.keys(createCaurtedList()).length).toBe(12);
    window.localStorage.clear();
  });
});