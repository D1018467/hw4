var express = require('express');
var router = express.Router();

sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./database.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    sql= "SELECT * FROM quote ORDER BY id";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});


router.post('/', (req, res) => {
    const {date, name, price}=req.body;
    sql = "INSERT INTO quote (date, name, price) VALUES (?, ?, ?)";
    db.run(sql, [date, name, price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    //res.redirect('/data.html');
    return res.status(200).send('inserted');
})

module.exports = router;