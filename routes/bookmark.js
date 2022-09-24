const express = require('express');
const router = express.Router();

const {
    Category, Bookmark
  } = require('../db');

// importing bookmark views
const {
    listAllBookmarks
} = require('../views/bookmark');

// list all bookmarks route
router.get("/", async (req, res) => {
    const bookmarks = await Bookmark.findAll({
        include:Category
    });
    const categories = await Category.findAll();
    const categoryNames = categories.map(category=>category.name);
    res.send(listAllBookmarks(bookmarks,categoryNames));
});

router.post("/", async (req,res)=>{
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
    res.redirect(`/categories/${category.id}`);
});

// delete a bookmark
router.delete('/:id',async(req,res)=>{
    const bookmarkId = req.params.id;
    const bookmark = await Bookmark.findByPk(bookmarkId);
    await bookmark.destroy();
    res.redirect('/');
});

module.exports = router;