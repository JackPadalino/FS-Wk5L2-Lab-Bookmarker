const html  = require('html-template-tag');

function categoryHTML(categories){
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
            ${categories.map(
            (category) =>
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

module.exports = {
    categoryHTML:categoryHTML
};