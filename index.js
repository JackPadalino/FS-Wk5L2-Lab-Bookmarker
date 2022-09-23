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
    try{
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
    }catch(error){
        res.send('Oops! Something went wrong!');
    }
});

app.get("/createbookmark", async(req, res) => {
    const categories = await Category.findAll();
    res.send(bookmarkViews.createBookmark(categories));
});

app.post("/postbookmark", async (req,res,next)=>{
    // getting the data from the form on the 'create' page
    bookName = req.body.name;
    bookURL = req.body.url;
    categoryName = req.body.category;
    // finding the correct category
    const category = await Category.findOne({
        where:{
            name:categoryName      
        }
    })
    await Bookmark.create({
        name: bookName,
        url: bookURL,
        categoryId: category.id
    });
    // redirecting back to the home page after creating a new bookmark
    res.redirect("/");
});

// list all categories route
app.get("/categories", async (req, res, next) => {
    const categories = await Category.findAll();
    res.send(categoryViews.listAllCategories(categories));
});

app.get("/createcategory", (req, res) => {
    res.send(categoryViews.createCategory());
});

app.post("/postcategory",async(req,res,next)=>{
    const categoryName = req.body.category;
    await Category.create({
        name:categoryName
    })
    res.redirect('/createbookmark');
})

const PORT = 3000;

app.listen(PORT, (test) => {
  console.log(`Connected to: https://localhost:${PORT}`,)
});