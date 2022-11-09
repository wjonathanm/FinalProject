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
app.get("/ManagerPTO", (req,res) => {
    res.render('ManagerPTO',{
    });
});
app.get("/AdminUser", (req, res) => {
    res.render('AdminUser', {
    })
});

let port = 3000;
app.listen( port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})