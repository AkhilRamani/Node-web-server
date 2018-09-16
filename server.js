const express = require('express');
const hbs = require('hbs');
const fs= require('fs');
let app= express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} :${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log + '\n', (err)=>{
        if (err) console.log(err);
    });

    next();
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/Pages'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('upperCase', (text)=>{
    return text.toUpperCase();
})

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage :'Hello There! Welcome to my website'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.listen(3000, () =>{
    console.log('Server is Up on 3000');
    
});
