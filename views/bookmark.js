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
    <!--<Create new bookmark form-->
    <div>
        <form method="post" action="/bookmarks">
            <label for="name">New bookmark</label>
            <input type="text" name="name" />
            <label for="url">URL</label>
            <input type="url" name="url" placeholder="https://www.example.com"/>
            <label for="category">Category</label>
            <!--dropdown menu for all categories-->
            <select id="select" name="category">
                ${categoryNames.map((categoryName) =>
                    `
                    <option value="${categoryName}">${categoryName}</option>
                    `
                )}
            </select>
            <button type="submit">Submit</button>
        </form>
    </div>
    <!--Create new category form-->
    <div>
        <form method="post" action="/categories">
            <label for="category">New category</label>
            <input type="text" name="category" />
            <button type="submit">Submit</button>
        </form>
    </div>
    <div>
    ${bookmarks.map((bookmark)=>
        `
        <p><a href='${bookmark.url}'>${bookmark.name}</a> - <a href="/categories/${bookmark.category.id}">${bookmark.category.name}</a></p>
        `
    )}
    </div>
</body>
</html>
`
};

function bookmarksByCategory(bookmarks,category){
    return html`
<!DOCTYPE html>
<html>
<head>
    <title>Bookmarker</title>
</head>
<body>
    <h1>${category.name}</h1>
    <div>
        <!--Using the method-override middleware to turn POST request into DELETE request-->
        ${bookmarks.map((bookmark)=>
            `
            <form method="POST" action="/bookmarks/${bookmark.id}?_method=DELETE">
                <a href='${bookmark.url}'>${bookmark.name}</a>
                <button type="submit">x</button>
            </form>
            ` 
            )}
    </div>
</body>
</html>
`
};

module.exports = {
    listAllBookmarks:listAllBookmarks,
    bookmarksByCategory:bookmarksByCategory,
};