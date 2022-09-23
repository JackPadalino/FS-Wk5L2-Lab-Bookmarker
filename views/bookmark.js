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
    <small><a href="/create">Add new bookmark</a></small>
    <div>
    ${bookmarks.map((bookmark) =>
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

function createBookmark(){
    return html`
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <div>
        <form method="post" action="/post">
            <label for="name">Name</label>
            <input type="text" name="name" />
            <label for="url">URL</label>
            <input type="text" name="url" />
            <label for="category">Category</label>
            <input type="text" name="category" />
            <button type="submit">Submit</button>
        </form>
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