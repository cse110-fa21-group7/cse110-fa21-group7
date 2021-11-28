const url = require("url");
const fs = require("fs");
const FormData = require("form-data");
const express = require("express");
const router = express.Router();
// const { nextTick } = require("process");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const fetch = require("node-fetch");

const API_IMGUR_KEY = process.env.API_IMGUR_KEY;

router.post("/image", multipartMiddleware, async (req, res, next) => {
  console.log("server post");
  const img = fs.createReadStream(req.files.image.path);
  const formdata = new FormData();
  formdata.append("image", img);
  const request = await fetch("https://api.imgur.com/3/image/", {
    method: "post",
    headers: { Authorization: `Client-ID ${API_IMGUR_KEY}` },
    body: formdata,
  });
  const result = await request.json();
  console.log(result.data.link);
  res.send(result.data);
});

module.exports = router;
