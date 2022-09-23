const {
    Category, Bookmark
  } = require('./db');

// importing bookmark views
const {
    listAllBookmarks,bookmarkDetails,bookmarksByCategory,createBookmark
} = require('./views/bookmark');

// importing category views
const {
    listAllCategories,createCategory
} = require('./views/category');

const express = require("express");
const app = express();

// middleware for parsing url-encoded bodies from form submissions
app.use(express.urlencoded({ extended: false }));

// redirecting to bookmarks route
app.get("/", (req, res) => {
    res.redirect("/bookmarks");
  })

// list all bookmarks route
app.get("/bookmarks", async (req, res, next) => {
    const bookmarks = await Bookmark.findAll();
    
    res.send(listAllBookmarks(bookmarks));
});

// get details of a single bookmark
app.get('/bookmarkdetails/:id',async(req,res,next)=>{
    const bookmarkId = req.params.id;
    const bookmark = await Bookmark.findOne({
        where:{
            id:bookmarkId
        },
        include:Category
    });
    res.send(bookmarkDetails(bookmark));
});

app.get("/createbookmark", async(req, res) => {
    const categories = await Category.findAll();
    res.send(createBookmark(categories));
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

// delete a bookmark
app.get('/deletebookmark/:id',async(req,res,next)=>{
    const bookmarkId = req.params.id;
    const bookmark = await Bookmark.findByPk(bookmarkId);
    await bookmark.destroy();
    res.redirect('/');
});

// list all categories route
app.get("/categories", async (req, res, next) => {
    const categories = await Category.findAll();
    res.send(listAllCategories(categories));
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
        const category = await Category.findByPk(catId);
        const catName = category.name;
        res.send(bookmarksByCategory(bookmarks,catName)); 
    }catch(error){
        res.send('Oops! Something went wrong!');
    }
});

app.get("/createcategory", (req, res) => {
    res.send(createCategory());
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