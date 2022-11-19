const pug = require('pug');
const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(express.static('public'));
app.set( 'views', 'views');
app.set( 'view engine', 'pug');

let bodyParser = require('body-parser');
app.use(bodyParser.json());
const con = require("./mysql");

const data = require("./public/data/PTOUserSeedData.json");

app.get("/LogIn", (req, res) => {
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

app.get("/ManagerPTO", (req,res) => {
    res.render('ManagerPTO',{
    });
});
app.get("/ManagerPTO/ChangeManager", (req,res) => {
    res.render('ChangeManager',{
    });
});
app.get("/ManagerPTO/AcceptManager", (req,res) => {
    res.render('AcceptManager',{
    });
});

app.get("/AdminUser", (req, res) => {
    res.render('AdminUser', {
    })
});
app.get("/", function (req, res){
    let sql = 'select EmployeeId, FirstName, LastName, Email, HireDate, LeaderId, Role, PtoBalanceVacation, PtoBalancePersonal, PtoBalanceSick';
    sql += ' from Employees';
    con.query( sql, function(err, results ){
        if ( err) {
            throw err;
        } else {
            console.log( results);
        }
        // res.send("It is good");
        res.render( 'insertEmp', {
            data : results
        });
    })
});
let port = 3000;
app.listen( port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})