const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/bookmarker');

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

const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Category.hasMany(Bookmark);
Bookmark.belongsTo(Category);

module.exports = {
    db,
    Bookmark,
    Category
};