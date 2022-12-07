const pug = require('pug');
const express = require('express');
// const bcrypt = require('bcrypt')
// const crypto = require('crypto');
const url = require('url');
// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
// const cipher = crypto.createCipheriv(algorithm, key, iv);
// const decipher = crypto.createDecipheriv(algorithm, key, iv);
const session = require('express-session');
const app = express();

// let secret_key = 'fd85b494-aaaa';
// let encryptionMethod = 'AE5-250-CBC';
// let secret_iv = 'smslt';
// let key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0,32);
// let iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0,16);
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

app.get("/chart", function (req,res){
    let Uid = req.session.Uid;
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
})
app.get("/LogIn", (req, res) => {
    res.render('LogIn', {
    })
});
app.get("/EmployeePTO", (req, res) => {
    // let Uid=100856;
    // let Uid = req.body.userId;
    // console.log(Uid)
    let Uid = req.session.Uid;
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
    let Mid=465217;

    let sql = `SELECT * FROM Leader WHERE LeaderId = "${Mid}"`
    console.log(sql)
    con.query(sql, function (error, data) {
        if ( error) {
            throw error;
        } else {
            console.log( data);
        }
        res.render( 'ManagerPTO', {
            info : data
        });
    })

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
    // let saltRounds = 10;
    // let hashedPassword = bcrypt.hashSync(password, saltRounds)
    let hashedPassword = cipher.update(password, "utf-8", "hex");
    hashedPassword += cipher.final("hex");
    let sql = `Insert into Employees(EmployeeId, Password,FirstName, LastName, Email,HireDate,LeaderId,Role,PtoBalanceVacation, PtoBalancePersonal, PtoBalanceSick)`
    sql += `Values('${id}', '${hashedPassword}','${fname}', '${lname}','${email}','2022-12-01', '113582', 'Employee', 10, 3, 5)`
    con.query(sql)
    res.redirect('/LogIn')
})
app.post("/LogIn", function (req, res) {
    let Uid = req.body.userId;
    let Pass = req.body.password;
    if (Uid) {
        let sql = `SELECT * FROM Employees WHERE EmployeeId = "${Uid}"`
        console.log(sql)
        con.query(sql, function (error, data) {
            if (data.length > 0) {
                for (var count = 0; count < data.length; count++) {
                    if (data[count].EmployeeId == Uid && data[count].Role == "Employee") {
                        req.session.loggedin = true;
                        req.session.Uid = Uid;
                        console.log(req.session.Uid)

                        res.redirect("/EmployeePTO");
                        // let id = data[count].EmployeeId;
                        // let role = data[count].Role;
                        // let fname = data[count].FirstName;
                        // let lname = data[count].LastName;
                        // let lid = data[count].LeaderId;
                        // let hire = data[count].HireDate;
                        // let sick = data[count].PtoBalanceSick;
                        // let personal = data[count].PtoBalancePersonal;
                        // let vacation = data[count].PtoBalanceVacation;
                        // res.render('insertEmp', {
                        //     id : id,
                        //     role : role,
                        //     fname : fname,
                        //     lname : lname,
                        //     lid : lid,
                        //     hire : hire,
                        //     sick : sick,
                        //     personal : personal,
                        //     vacation : vacation,
                        //
                        // })
                    } else if (data[count].EmployeeId == Uid && data[count].Role == "Manager") {
                        req.session.Uid = data[count].Uid;

                        res.redirect("/ManagerPTO")
                    } else if (data[count].EmployeeId == Uid && data[count].Role == "Director") {
                        req.session.Uid = data[count].Uid;

                        res.redirect("/AdminUser")
                    } else {
                        res.send("YOU SUCK!!!!")
                    }

                }
            } else {
                res.send('Incorrect EmployeeId')
            }
            res.end();
        })
    } else {
        res.send('Please Enter An Employee Id and Password');
        res.end();
    }
});
let port = 3000;
app.listen( port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})