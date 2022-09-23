const html = require('html-template-tag');

function listAllBookmarks(bookmarks,categoryNames){
    return html`
<!DOCTYPE html>
<html>
<head>
    <title>Bookmarker</title>
</head>
<body>
    <h1>Bookmarker</h1>
    <!--<small><a href="/createbookmark">Add new bookmark</a></small>-->
    <form method="post" action="/bookmarks">
        <label for="name">Name</label>
        <input type="text" name="name" />
        <label for="url">URL</label>
        <input type="url" name="url" />
        <label for="category">Category</label>
        <select id="select" name="category">
            ${categoryNames.map((categoryName) =>
                `
                <option value="${categoryName}">${categoryName}</option>
                `
            )}
        </select>
        <button type="submit">Submit</button>
    </form>
    <div>
    ${bookmarks.map((bookmark)=>
        `
        <p><a href='${bookmark.url}'>${bookmark.name}</a> - ${bookmark.category.name}</h2>
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
    <title>Bookmarker</title>
</head>
<body>
    <h1>${catName}</h1>
    <div>
    ${bookmarks.map((bookmark) =>
        `
        <a href='/bookmarkdetails/${bookmark.id}'><p>${bookmark.name}</p>
        `
    )}
    </div>
</body>
</html>
`
};

function deleteBookmark(){
    //pass
};

module.exports = {
    listAllBookmarks:listAllBookmarks,
    bookmarksByCategory:bookmarksByCategory,
};