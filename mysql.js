var mysql = require('mysql');
var con = mysql.createConnection({
    host: "45.55.136.114",
    user: "F4_F2022",
    password: "F4r4coders!",
    database: "F4_F2022"
});

module.exports = con;