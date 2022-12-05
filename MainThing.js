const pug = require('pug');
const express = require('express');
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const session = require('express-session');
const app = express();
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
const {SERVER_STATUS_LAST_ROW_SENT} = require("mysql/lib/protocol/constants/server_status");
// const query = require("express");

// const data = require("./public/data/PTOUserSeedData.json");

app.get("/LogIn", (req, res) => {
    res.render('LogIn', {
    })
});
app.get("/EmployeePTO", (req, res) => {
    let Uid=100856;
    // let Uid = req.body.userId;
    // console.log(Uid)
    let sql = `SELECT * FROM Employees WHERE EmployeeId = "${Uid}"`
    console.log(sql)
    con.query(sql, function (error, data) {
        if ( error) {
            throw error;
        } else {
            console.log( data);
            // req.session.Uid = data[count].Uid;
        }
        res.render( 'EmployeePTO', {
            info : data
        });
    })

});
app.post("/EmployeePTO/Request",function (req,res){
    let employeeID="100856";
    let startDate=req.body.startDate;
    let endDate=req.body.endDate;
    // let ptoType=req.body.ptoType;
    let reason=req.body.Reason;

    let sql = `Insert into RequestForm (EmployeeId, StartDate, EndDate, Reason)`;
    sql += ` values('${startDate}',`
    sql += ` '${employeeID}'`
    sql += ` '${endDate}',`
    // sql += ` '${ptoType}',`
    sql += ` '${reason}' )`;
    console.log(`sql:${sql}`);
    con.query(sql);
    res.render( 'EmployeePTO', {
        startDate: startDate,
        endDate: endDate,
        // ptoType:ptoType,
        reason:reason
    })
    console.log(`reason:${reason}`);

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
app.get("/ManagerPTO/ResponseManager", (req, res) => {
    res.render('ResponseManager', {
    });
});
app.get("/ManagerPTO/ResponseEmpManager", (req, res) => {
    res.render('ResponseEmpManager', {
    });
});
app.get("/ManagerPTO/ResponsePending", (req, res) => {
    res.render('ResponsePending', {
    });
});

app.get("/AdminUser", (req, res) => {
    res.render('AdminUser', {
    })
});
app.get("/AdminUser/SetHoliday", (req, res) => {
    res.render('SetHoliday', {
    })
});
app.get('/AdminUser/SearchBarEmployee', (req, res) => {
    let sql = 'select Employeeid,FirstName,LastName,HireDate';
    sql += ' from Employees Where Employeeid= "Employeeid"';
    console.log("sql=",sql)
    con.query( sql, function(err, results ){
        if ( err) {
            throw err;
        } else {
            console.log( results);
        }
        // res.send("It is good");
        res.render( 'showEmployeeSearch', {
            data : results
        });
    })
})
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