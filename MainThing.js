const pug = require('pug');
const express = require('express');
const session = require('express-session');
const app = express();
const bcrypt = require('bcrypt');

// const mysql = require('mysql');
app.use(express.static('public'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.set( 'views', 'views');
app.set( 'view engine', 'pug');

app.use(express.urlencoded({ extended: false})); // access form from the request variable inside post method

let bodyParser = require('body-parser');
app.use(bodyParser.json());
const con = require("./mysql");

// const query = require("express");

// const data = require("./public/data/PTOUserSeedData.json");

app.get("/LogIn", (req, res) => {
    res.render('LogIn', {
    })
});
app.get("/EmployeePTO", (req, res) => {
    res.render('EmployeePTO', {
    })
});
app.post("/EmployeePTO", function (req, res){

})
app.get("/EmployeePTO/Request", (req, res) => {
    res.render('Request', {
    })
});
app.get("/EmployeePTO/History", (req, res) => {
        res.render('History', {
        })
});

app.get("/ManagerPTO", (req,res) => {
    res.render('ManagerPTO',{
    });
});
app.get("/ManagerPTO/RequestManager", (req,res) => {
    res.render('RequestManager',{
    });
});
app.get("/ManagerPTO/WorkersRequestManager", (req,res) => {
    res.render('WorkersRequestManager',{
    });
});
app.get("/ManagerPTO/PendingRequestManager", (req,res) => {
    res.render('PendingRequestManager',{
    });
});

app.get("/AdminUser", (req, res) => {
    res.render('AdminUser', {
    })
});
app.get("/signup", function (req, res ){
    res.render('signup',{

    })
})
app.post('/signup', function (req, res){
    let id = req.body.userId;
    let password = req.body.password;
    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let email = req.body.email;
    console.log(id);
    let saltRounds = 10;
    let hashedPassword = bcrypt.hashSync(password, saltRounds)
        let sql = `Insert into Employees(EmployeeId, Password,FirstName, LastName, Email,HireDate,LeaderId,Role,PtoBalanceVacation, PtoBalancePersonal, PtoBalanceSick)`
        sql += `Values('${id}', '${hashedPassword}','${fname}', '${lname}','${email}','2022-12-01', '113582', 'Employee', 10, 3, 5)`
        con.query(sql)
        res.redirect('/LogIn')
})
app.post('/Login', function (req, res){
    let id = req.body.userId;
    let password = req.body.password;
    let sql = `Select * From Employees Where EmployeeId = '${id}'`
    con.query(sql,function (err, data){
        if (!err && data.length){
            let comp = bcrypt.compareSync(password, data[0].Password);
            console.log(data[0].Password)
            console.log(password);
            console.log(comp);

        }
    })
});
let port = 3000;
app.listen( port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})