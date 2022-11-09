const pug = require('pug');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.set( 'views', 'views');
app.set( 'view engine', 'pug');

app.get("/LogIn", (req, res) => {
    // res.send("<br /> It looks ok");
    res.render('LogIn', {
    })
});
app.get("/EmployeePTO", (req, res) => {
    res.render('EmployeePTO', {
    })
});
app.get("/EmployeePTO/Request", (req, res) => {
    res.render('Request', {
    })
});
app.get("/EmployeePTO/History", (req, res) => {
        res.render('History', {
    })
});

let port = 3000;
app.listen( port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})