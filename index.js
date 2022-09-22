const {
    Category, Bookmark
  } = require('./db');

// importing the views that deliver HTML
const homeViews = require('./views/home.js');
const categoryViews = require('./views/category.js');
const bookmarkViews = require('./views/bookmark.js')

const express = require("express");
const app = express();

// home route
app.get('/',(req,res,next)=>{
    const html = homeViews.homeHTML();
    res.send(html);
});

// list all categories route
app.get("/categories", async (req, res, next) => {
    const categories = await Category.findAll(); // using Sequelize to get all Category instances
    const html = categoryViews.categoryHTML(categories);
    res.send(html)
});

// list all bookmarks route
app.get("/bookmarks", async (req, res, next) => {
    const bookmarks = await Bookmark.findAll({ // using Sequelize to get al Bookmark instances
        include: [                             // and stating that we want each bookmark's category
            Category                           //
        ]                                      // 
    });
    const html = bookmarkViews.bookmarkHTML(bookmarks);
    res.send(html);
});

const PORT = 3000;

app.listen(PORT, (test) => {
  console.log(`Connected to: https://localhost:${PORT}`,)
});