const Sequelize = require('sequelize'); // importing Sequelize ORM
const db = new Sequelize('postgres://localhost:5432/bookmarker'); // URL path to our db

// defining the Bookmark db model
const Bookmark = db.define('bookmark', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// defining the Category db model
const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// defining the relationship between Bookmark and Category to be 'one to many'
Category.hasMany(Bookmark);
Bookmark.belongsTo(Category);

module.exports = {
    db,
    Bookmark,
    Category
};