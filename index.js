const {
    Category, Bookmark
  } = require('./db');

const homeViews = require('./views/home.js');
const categoryViews = require('./views/category.js');
const bookmarkViews = require('./views/bookmark.js')

const express = require("express");
const app = express();

app.get('/',(req,res,next)=>{
    const html = homeViews.homeHTML();
    res.send(html);
});

app.get("/categories", async (req, res, next) => {
    const categories = await Category.findAll();
    const html = categoryViews.categoryHTML(categories);
    res.send(html)
});

app.get("/bookmarks", async (req, res, next) => {
    const bookmarks = await Bookmark.findAll({
        include: [
            Category
        ]
    });
    const html = bookmarkViews.bookmarkHTML(bookmarks);
    res.send(html);
});

const PORT = 3000;
app.listen(PORT, (test) => {
  console.log(`Connected to: https://localhost:${PORT}`,)
});