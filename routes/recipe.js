const url = require("url");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
// Env vars
const API_BASE_URL = "https://api.spoonacular.com/recipes";
const API_RECIPE_NAME = "apiKey";
const API_RECIPE_VALUE = process.env.API_RECIPE_VALUE;

router.get("/recipe", async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
      [API_RECIPE_NAME]: API_RECIPE_VALUE,
      number: 12,
    });
    // Log the request to the public API
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_URL}/complexSearch?${params}`);
    }
    const apiRes = await fetch(`${API_BASE_URL}/complexSearch?${params}`);
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
    // next(error);
  }
});

router.get("/recipeId", async (req, res) => {
  try {
    console.log(url.parse(req.url, true));
    const id = url.parse(req.url, true).query.id;
    const params = new URLSearchParams({
      [API_RECIPE_NAME]: API_RECIPE_VALUE,
    });
    // Log the request to the public API
    if (process.env.NODE_ENV !== "production") {
      console.log(`${API_BASE_URL}/${id}/information?${params}`);
    }
    const apiRes = await fetch(`${API_BASE_URL}/${id}/information?${params}`);
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
    // next(error);
  }
});

module.exports = router;
