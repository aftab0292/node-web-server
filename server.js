const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

// Server logs
app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now} : ${req.method} : ${req.url}`
    console.log(log);
    fs.appendFileSync(`server.log`, log + '\n');
    next();
});

/* app.use((req, res)=>{
    res.render('maintenance.hbs')
});
 */

// Serve static directory
app.use(express.static(__dirname + '/public'));

// home page routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!'
    });
});

// about page routes
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

// Bad page routes
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle error'
    });
});

// Node Server
app.listen(3000, () => {
    console.log(`Server is listening on PORT: 3000`);
});

// https://www.intel.com/content/www/us/en/support/intel-driver-support-assistant.html