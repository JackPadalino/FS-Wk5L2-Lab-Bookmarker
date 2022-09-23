const {
    Category, Bookmark
  } = require('./db');

// importing the views that deliver HTML
const homeViews = require('./views/home.js');
const categoryViews = require('./views/category.js');
const bookmarkViews = require('./views/bookmark.js')

const express = require("express");
const app = express();

// middleware for parsing url-encoded bodies from form submissions
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.redirect("/bookmarks");
  })

// list all bookmarks route
app.get("/bookmarks", async (req, res, next) => {
    const bookmarks = await Bookmark.findAll({
        include:[Category]
    });
    res.send(bookmarkViews.listAllBookmarks(bookmarks));
});

// list all bookmarks by category
app.get("/categories/:id", async (req,res,next)=>{
    const catId = req.params.id
    const bookmarks = await Bookmark.findAll({
        where:{
            categoryId:[catId]
        }
    });
    const category = await Category.findAll({
        where:{
            id:[catId]
        }
    });
    const catName = category[0].name;
    res.send(bookmarkViews.bookmarksByCategory(bookmarks,catName)); 
});

app.get("/create", (req, res) => {
    res.send(bookmarkViews.createBookmark());
});

app.post("/post", async (req,res,next)=>{
    // getting the data from the form on the 'create' page
    bookName = req.body.name;
    bookURL = req.body.url;
    categoryName = req.body.category;
    // finding the correct category
    const categories = await Category.findAll({
        where:{
            name:categoryName      
        }
    })
    const category = categories[0];
    // using Sequelize to create a new category
    await Bookmark.create({
        name: bookName,
        url: bookURL,
        categoryId: category.id
    });
    // redirecting back to the home page after creating a new bookmark
    res.redirect("/");
});

const PORT = 3000;

app.listen(PORT, (test) => {
  console.log(`Connected to: https://localhost:${PORT}`,)
});