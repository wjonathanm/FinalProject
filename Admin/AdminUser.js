const express = require('express');
const app = express();
app.use(express.static('public'));
app.set( 'views', 'views');
app.set( 'view engine', 'pug');

app.get("/AdminUser", (req, res) => {
    res.render('AdminUser', {
    })
});

let port = 3000;
app.listen( port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})