const {
    db,Boomkark,Category, Bookmark
} = require('./db');

const seedDb = async()=>{
    // clearing the database
    await db.sync({force:true,logging:false});

    // making a few Category instances
    const coding = await Category.create({
        name: "coding"
    });
    const search = await Category.create({
        name:'search'
    });
    const jobs = await Category.create({
        name:'jobs'
    });

    // making a few Bookmark instances
    await Bookmark.create({
        name: 'Google',
        url: 'https://www.google.com/',
        categoryId: search.id
    });

    await Bookmark.create({
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/',
        categoryId: coding.id
    });

    await Bookmark.create({
        name: 'Bing',
        url: 'https://www.bing.com/',
        categoryId: search.id
    });

    await Bookmark.create({
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/',
        categoryId: jobs.id
    });

    await Bookmark.create({
        name: 'Indeed',
        url: 'https://www.indeed.com/',
        categoryId: jobs.id
    });

    await Bookmark.create({
        name: 'MDN',
        url: 'https://developer.mozilla.org/en-US/',
        categoryId: coding.id
    });

};

seedDb();