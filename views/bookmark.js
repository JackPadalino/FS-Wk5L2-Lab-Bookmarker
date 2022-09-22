const html = require("html-template-tag");

function bookmarkHTML(bookmarks){
    return html`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Song DB</title>
        <link rel='stylesheet' href='/style.css'/>
    </head>
    <body>
        <div id="mainContainer">
        <h1 id="mainTitle">Songs</h1>
        <div id='songListContainer'>
            ${bookmarks.map(
            (bookmark) =>
                `
                <h1>${bookmark.name}</h1>
                <h3>${bookmark.url}</h3>
                <p>${bookmark.category.name}</p>
                `
            )}
        </div>
        </div>
    </body>
    </html>
    `
};

module.exports = {
    bookmarkHTML:bookmarkHTML
};