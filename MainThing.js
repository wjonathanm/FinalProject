const pug = require('pug');
const express = require('express');
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
app.post("/EmployeePTO",function (req,res){
    // let Uid = req.body.userId;
    // let sql = `SELECT * FROM Employees WHERE EmployeeId = "${Uid}"`
    // console.log(sql)
    // con.query(sql, function (error, data) {
    //     if ( error) {
    //         throw error;
    //     } else {
    //         console.log( data);
    //         req.session.Uid = data[count].Uid;
    //     }
    //
    // })
    // res.render( 'EmployeePTO', {
    //     data : data
    // });

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
    if ( Uid ){
        let sql = `SELECT * FROM Employees WHERE EmployeeId = "${Uid}"`
        console.log(sql)
        con.query(sql, function (error, data){
            if (data.length > 0){
                for (var count = 0; count < data.length; count++){
                    if (data[count].EmployeeId == Uid && data[count].Role == "Employee"){
                        req.session.Uid = data[count].Uid;

                        res.redirect("/EmployeePTO");

                    }else if (data[count].EmployeeId == Uid && data[count].Role == "Manager"){
                        req.session.Uid = data[count].Uid;

                        res.redirect("/ManagerPTO")
                    }else if (data[count].EmployeeId == Uid && data[count].Role == "Director"){
                        req.session.Uid = data[count].Uid;

                        res.redirect("/AdminUser")
                    }else{
                        res.send("YOU SUCK!!!!")
                    }

                }
            }else{
                res.send('Incorrect EmployeeId')
            }
            res.end();
        })
    }else{
        res.send('Please Enter An Employee Id and Password');
        res.end();
        // let sql = `Update Employees Set Password = "${Pass}" Where EmployeeId = "${Uid}"`
        // con.query(sql);
        // alert("Refreshing");
        // res.refresh("/LogIn");
        // res.end();
    }
    //     con.query('SELECT * FROM Employees WHERE Uid = ?', [Uid], function (error, results, fields){
    //         if (error) throw error;
    //         if (results.length > 0){
    //             results.session.loggedin = true;
    //             results.session.Uid = Uid;
    //             res.redirect('/EmployeePTO2');
    //         }else{
    //             res.send('Incorrect UserName');
    //         }
    //         res.end();
    //     })
    // }else{
    //     res.send('Please Enter a UserName');
    //     res.end();
    // }
    // let sql = 'SELECT EmployeeId, FirstName, LastName, Email, HireDate, LeaderId, Role, PtoBalanceVacation, PtoBalancePersonal, PtoBalanceSick';
    // sql += ' FROM Employees';
    // con.query( sql, function(err, results ) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         results=JSON.parse(JSON.stringify(results))
    //         console.log(results)
    //     }
    // });
});
// app.get("/EmployeePTO2", (req, res) => {
//     if (req.session.loggedin){
//         res.render('EmployeePTO', {
//         })
//     }else{
//         res.send('Please login to view this page');
//     }
// });
let port = 3000;
app.listen( port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})