const html  = require('html-template-tag');

function listAllCategories(categories){
    return html`
<!DOCTYPE html>
<html>
<head>
    <title>Bookmarker</title>
</head>
<body>
    <div id="mainContainer">
    <h1 id="mainTitle">Songs</h1>
    <div id='songListContainer'>
        ${categories.map((category) =>
            `
            <h1>${category.name}</h1>
            `
        )}
    </div>
    </div>
</body>
</html>
`
};

function createCategory(){
    return html`
<!DOCTYPE html>
<html>
<head>
    <title>Bookmarker</title>
</head>
<body>
    <div>
        <form method="post" action="/postcategory">
            <label for="category">New category</label>
            <input type="text" name="category" />
            <button type="submit">Submit</button>
        </form>
    </div>
</body>
</html>`;
};

module.exports = {
    listAllCategories:listAllCategories,
    createCategory:createCategory
};