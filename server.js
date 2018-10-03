const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now} : ${req.method} : ${req.url}`
    console.log(log);
    fs.appendFileSync(`server.log`, log + '\n');
    next();
});

app.use((req, res)=>{
    res.render('maintenance.hbs')
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle error'
    });
})

app.listen(3000, () => {
    console.log(`Server is listening on PORT: 3000`);
});