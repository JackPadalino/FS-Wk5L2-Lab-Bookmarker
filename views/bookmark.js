const html = require('html-template-tag');

function listAllBookmarks(bookmarks){
    return html`
<!DOCTYPE html>
<html>
<head>
    <title>Bookmarks</title>
</head>
<body>
    <h1>All bookmarks</h1>
    <small><a href="/createbookmark">Add new bookmark</a></small>
    <div>
    ${bookmarks.map((bookmark)=>
        `
        <h2>${bookmark.name} - ${bookmark.category.name}</h2>
        <a href='${bookmark.url}'><p>${bookmark.url}</p></a>
        `
    )}
    </div>
</body>
</html>
`
};

function bookmarksByCategory(bookmarks,catName){
    return html`
<!DOCTYPE html>
<html>
<head>
    <title>Bookmarks</title>
</head>
<body>
    <h1>${catName}</h1>
    <div>
    ${bookmarks.map((bookmark) =>
        `
        <h2>${bookmark.name}</h2>
        <a href='${bookmark.url}'><p>${bookmark.url}</p></a>
        `
    )}
    </div>
</body>
</html>
`
};

function createBookmark(categories){
    return html`
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <div>
        <form method="post" action="/postbookmark">
            <label for="name">Name</label>
            <input type="text" name="name" />
            <label for="url">URL</label>
            <input type="text" name="url" />
            <label for="category">Category</label>
            <select id="select" name="category">
                ${categories.map((category) =>
                    `
                    <option value="${category.name}">${category.name}</option>
                    `
                )}
            </select>
            <button type="submit">Submit</button>
        </form>
        <a href="/createcategory">Add new category</a>
    </div>
</body>
</html>`;
};

function deleteBookmark(){
    //pass
};

module.exports = {
    listAllBookmarks:listAllBookmarks,
    bookmarksByCategory:bookmarksByCategory,
    createBookmark:createBookmark
};