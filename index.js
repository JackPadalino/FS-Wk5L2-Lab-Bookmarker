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

app.post("/", async (req,res,next)=>{
    bookName = req.body.name;
    bookURL = req.body.url;
    catName = req.body.category;
    /*
    const category = await Category.findAll({
        where:{
            name:catName      
        }
    })
    await Bookmark.create({
        name: bookName,
        url: bookURL,
        categoryId: category.id
    });
    */
    console.log({
        bookName,
        bookURL,
        catName
    });

    res.redirect("/");
});

const PORT = 3000;

app.listen(PORT, (test) => {
  console.log(`Connected to: https://localhost:${PORT}`,)
});