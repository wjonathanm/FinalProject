const pug = require('pug');
const express = require('express');
const session = require('express-session');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
// app.get("/", function (req, res){
//     let sql = 'select EmployeeId, FirstName, LastName, Email, HireDate, LeaderId, Role, PtoBalanceVacation, PtoBalancePersonal, PtoBalanceSick';
//     sql += ' from Employees';
//     con.query( sql, function(err, results ){
//         if ( err) {
//             throw err;
//         } else {
//             console.log( results);
//         }
//         // res.send("It is good");
//         res.render( 'insertEmp', {
//             data : results
//         });
//     })
// });
app.post("/LogIn", function (req, res){
    let Uid = req.body.userId;
    let Pass = req.body.password;
    let sql = `SELECT * FROM Employees WHERE EmployeeId = "${Uid}"`
    console.log(sql)
    con.query(sql, function (error, data) {
        if (data.length > 0) {
            for (var count = 0; count < data.length; count++) {
                if (data[count].EmployeeId == Uid && data[count].Password == Pass){
                    if (data[count].EmployeeId == Uid && data[count].Role == "Employee") {
                        req.session.Uid = data[count].Uid;

                        res.redirect("/EmployeePTO");

                    } else if (data[count].EmployeeId == Uid && data[count].Role == "Manager") {
                        req.session.Uid = data[count].Uid;

                        res.redirect("/ManagerPTO")
                    } else if (data[count].EmployeeId == Uid && data[count].Role == "Director") {
                        req.session.Uid = data[count].Uid;

                        res.redirect("/AdminUser")
                    } else {
                        res.send("YOU SUCK!!!!")
                    }
                }else if (data[count].EmployeeId == Uid && data[count].Password == null){
                    let sql = `UPDATE Employees SET Password = "${Pass}" WHERE EmployeeId = "${Uid}"`
                    con.query(sql)
                    res.redirect("/LogIn");
                }else{
                    console.log(Pass);
                    res.send('Incorrect Id or Password')
                }
                res.end();
            }
        }
    })
});
let port = 3000;
app.listen( port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})