var mysql = require('mysql');
var con = mysql.createConnection({
    host: "45.55.136.114",
    user: "F4_F2022",
    password: "F4r4coders!",
    database: "F4_F2022"
});
// con.connect(function(err) {
//     if (err)
//         throw err
//     else {
//         console.log('Connected to MySQL');
//         // Start the app when connection is ready
//         app.listen(3000);
//         console.log('Server listening on port 3000');
//     }
// });
// app.use(bodyParser.json())
//
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname+ '/myfile.html'));
// });
// app.post('/', function(req, res) {
//
//     var jsondata = req.body;
//     var values = [];
//
//     for(var i=0; i< jsondata.length; i++)
//         values.push([jsondata[i].EmployeeId,jsondata[i].FirstName, jsondata[i].LastName,jsondata[i].Email, jsondata[i].HireDate, jsondata[i].LeaderId, jsondata[i].Role, jsondata[i].PtoBalance]);
//
// //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
//     con.query('INSERT INTO Employees (EmployeeId, FirstName, LastName, Email, HireDate, LeaderId, Role, PtoBalance) VALUES ?', [values], function(err,result) {
//         if(err) {
//             res.send('Error');
//         }
//         else {
//             res.send('Success');
//         }
//     });
// });
module.exports = con;