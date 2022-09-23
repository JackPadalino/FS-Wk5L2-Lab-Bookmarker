const html = require('html-template-tag');

function listAllBookmarks(bookmarks){
    return html`
<!DOCTYPE html>
<html>
<head>
    <title>Bookmarker</title>
</head>
<body>
    <h1>All bookmarks</h1>
    <small><a href="/createbookmark">Add new bookmark</a></small>
    <div>
    ${bookmarks.map((bookmark)=>
        `
        <h2><a href='/bookmarkdetails/${bookmark.id}'>${bookmark.name}</a></h2>
        `
    )}
    </div>
</body>
</html>
`
};

function bookmarkDetails(bookmark){
    return html`
<!DOCTYPE html>
<html>
<head>
    <title>Bookmarker</title>
</head>
<body>
    <a href='${bookmark.url}'><h1>${bookmark.name}</h1></a>
    <div>
        <p>${bookmark.category.name}</p>
        <small><a href='/deletebookmark/${bookmark.id}'>delete bookmark</a></small>
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
    <title>Bookmarker</title>
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
    <title>Bookmarker</title>
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
    bookmarkDetails:bookmarkDetails,
    bookmarksByCategory:bookmarksByCategory,
    createBookmark:createBookmark
};