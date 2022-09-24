const express = require("express");
const app = express();

// methodOverride middleware for overriding POST and GET requests in forms
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// middleware for parsing url-encoded bodies from form submissions
app.use(express.urlencoded({ extended: false }));

// importing routes
const bookmarkRouter = require("./routes/bookmark");
const categoryRouter = require("./routes/category");
app.use("/bookmarks", bookmarkRouter);
app.use("/categories", categoryRouter);

// redirecting to bookmarks route
app.get("/", (req, res) => {
    res.redirect("/bookmarks");
  })

const PORT = 3000;

app.listen(PORT, (test) => {
  console.log(`Connected to: https://localhost:${PORT}`,)
});