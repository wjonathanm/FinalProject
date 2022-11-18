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
app.get("/AdminUser", (req, res) => {
    res.render('AdminUser', {
    })
});
app.get("/", function (req, res){
    res.render('insertEmp', {

    })
});
app.post("/insert", function (req,res){
    let EmployeeId = req.body.EmployeeId;
    let FirstName = req.body.FirstName;
    let LastName = req.body.LastName;
    let HireDate = req.body.HireDate;
    let LeaderId = req.body.LeaderId;
    let Role = req.body.Role;
    let PTOVac = req.body.PTOVac;
    let PTOPers = req.body.PTOPers;
    let PTOSick = req.body.PTOSick;

    let sql = `CREATE TABLE Employees(eid INT, fname VARCHAR(25), lame VARCHAR(25), email VARCHAR(29), HireDate VARCHAR(20), lid INT, role VARCHAR(8), PtoBalanceVacation INT, PtoBalancePersonal INT, PtoBalanceSick INT `;
    sql += `Insert into Employees(EmployeeId, FirstName, LastName, Email, HireDate, LeaderId, Role, PTOVac, PTOPers, PTOSick)`
    sql += ` values('${EmployeeId}',`
    sql += ` '${FirstName}',`
    sql += ` '${LastName}',`
    sql += ` '${Email}',`
    sql += ` '${HireDate}',`
    sql += ` '${LeaderId}',`
    sql += ` '${Role}',`
    sql += ` '${PTOVac}',`
    sql += ` '${PTOPers}',`
    sql += ` '${PTOSick}')`

    con.query(sql)

    res.render('/gotStuff', {

    })
})
let port = 3000;
app.listen( port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})