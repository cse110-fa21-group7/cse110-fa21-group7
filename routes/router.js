const url = require("url");
const fs = require("fs");
const FormData = require("form-data");
const express = require("express");
const router = express.Router();
const needle = require("needle");
const { nextTick } = require("process");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const fetch = require("node-fetch");
// const apicache = require("apicache");

// Env vars
const API_BASE_URL = process.env.API_RECIPE_URL;
const API_KEY_NAME = process.env.API_RECIPE_NAME;
const API_KEY_VALUE = process.env.API_RECIPE_VALUE;
const API_IMGUR_KEY = process.env.API_IMGUR_KEY;
// Init cache
// let cache = apicache.middleware;

router.get("/", async (req, res) => {
  try {
    console.log(url.parse(req.url, true));
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
      [API_KEY_NAME]: API_KEY_VALUE,
    });
    // Log the request to the public API
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }
    const apiRes = await needle("get", `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
    // next(error);
  }
});

router.post("/upload", multipartMiddleware, async (req, res, next) => {
  console.log("server post");
  const img = fs.createReadStream(req.files.image.path);
  const formdata = new FormData();
  formdata.append("image", img);
  fetch("https://api.imgur.com/3/image/", {
    method: "post",
    headers: {
      Authorization: `Client-ID ${API_IMGUR_KEY}`,
    },
    body: formdata,
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data.data.link);
    });
});

module.exports = router;
