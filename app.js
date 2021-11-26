const express = require("express"); // make a server
const cors = require("cors"); //
const path = require("path");
// const rateLimit = require("express-rate-limit");
require("dotenv").config();
// const errorHandler = require("./middleware/error");
const PORT = process.env.PORT || 5000; // use heroku or 5000
const app = express();

// Rate limiting use this for product model
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 Mins
//   max: 100,
// });
// app.use(limiter);
// app.set("trust proxy", 1);

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "source")));

app.use(
  "/cookbook",
  express.static(path.join(__dirname, "source/html/cook-book.html"))
);

app.use(
  "/create",
  express.static(path.join(__dirname, "source/html/create-recipe.html"))
);
// Routes
app.use("/search", require("./router"));
app.use("/create/image", require("./router"));

// Error handler middleware
// app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
