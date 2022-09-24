const express = require('express');
const router = express.Router();

const {
    Category, Bookmark
  } = require('../db');

// importing bookmark views
const {
    bookmarksByCategory
} = require('../views/bookmark');

router.post("/",async(req,res)=>{
    const categoryName = req.body.category;
    await Category.create({
        name:categoryName
    })
    res.redirect('/');
});

// list all bookmarks by category
router.get("/:id", async (req,res)=>{
    try{
        const catId = req.params.id
        const bookmarks = await Bookmark.findAll({
            where:{
                categoryId:[catId]
            }
        });
        const category = await Category.findByPk(catId);
        res.send(bookmarksByCategory(bookmarks,category)); 
    }catch(error){
        res.send('Oops! Something went wrong!');
    };
});

module.exports = router;