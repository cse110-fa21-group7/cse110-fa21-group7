import { showMessage, showError, showSuccess, hasValue, hasFloat } from "../js/create-recipe";

describe("test show message", () => {
  test("test true return value", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    expect(showMessage(input, "invalid", false)).toBe(false);
    expect(msg.innerText).toBe("invalid");
  });

  test("test false return value", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    expect(showMessage(input, "valid", true)).toBe(true);
    expect(msg.innerText).toBe("valid");
  });

});

describe("test showError function", () => {
  test("test false return value", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    expect(showError(input, "invalid")).toBe(false);
    expect(msg.innerText).toBe("invalid");
  });
});

describe("test showSuccess function", () => {
  test("test true return value", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    expect(showSuccess(input)).toBe(true);
    expect(msg.innerText).toBe("");
  });
});

describe("test hasValue function", () => {
  test("test valid input", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    input.value = "hello";
    expect(hasValue(input, "")).toBe(true);
    expect(msg.innerText).toBe("");
  });

  test("test no input", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    expect(hasValue(input, "invalid")).toBe(false);
    expect(msg.innerText).toBe("invalid");
  });

  test("test blank input", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    input.value = "  ";
    expect(hasValue(input, "invalid")).toBe(false);
    expect(msg.innerText).toBe("invalid");
  });
});

describe("test hasFloat function", () => {
  test("test valid input", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    input.value = "5.5";
    expect(hasFloat(input, "")).toBe(true);
    expect(msg.innerText).toBe("");
  });

  test("test valid input with empty space", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    input.value = " 5.5 ";
    expect(hasFloat(input, "")).toBe(true);
    expect(msg.innerText).toBe("");
  });

  test("test no input", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    expect(hasFloat(input, "invalid")).toBe(false);
    expect(msg.innerText).toBe("invalid");
  });

  test("test invalid input", () => {
    const parent = document.createElement("div");
    const msg = document.createElement("div");
    msg.className = "invalid-feedback";
    const input =  document.createElement("input");
    parent.appendChild(msg);
    parent.appendChild(input);
    input.value = "AB";
    expect(hasFloat(input, "invalid")).toBe(false);
    expect(msg.innerText).toBe("invalid");
  });
 
});
