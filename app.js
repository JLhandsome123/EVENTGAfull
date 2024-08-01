const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;
// import multer
const multer = require('multer');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // port: 3307,
    // password: '',
    // database: 'myeve'
    host: 'mysql-myeve.alwaysdata.net',
    user: 'myeve',
    password: '@JL0419rpHuat',
    database:'myeve_c237',
});

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});

const upload = multer({ storage : storage});


connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/', function (req, res) {
    const sql = 'SELECT * FROM event';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving Events');
        }
        res.render('index', { events: results });
    });
});

app.get('/myEvent', function (req, res) {
    const sql = 'SELECT * FROM event';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving Events');
        }
        res.render('myEvent', { events: results });
    });
});

app.get('/events/:id', function (req, res) {
    const eventId = parseInt(req.params.id);
    const sql = 'SELECT * FROM event WHERE eventId = ?';
    connection.query(sql, [eventId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving Event');
        }
        if (results.length > 0) {
            res.render('eventInfo', { event: results[0] });
        } else {
            res.status(404).send('Event Not Found');
        }
    });
});


app.get('/addEvent', function (req, res) {
    res.render('addEvent');
});

app.post('/events', upload.single('image'), (req, res) => {
    const { name, details, date, start_time, end_time, venue, price } = req.body;

    let image;
    if (req.file) {
        image = req.file.filename;
    } else {
        image = null;
    }

    const sql = 'INSERT INTO event (name, details, date, start_time, end_time, venue, price, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, details, date, start_time, end_time, venue, price, image], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Adding Event');
        }
        res.redirect('/');
    });
});

app.get('/register', function (req, res) {
    res.render('register');
});

app.post('/registered', (req, res) => {
    const { Name, phone, email } = req.body;
    const sql = 'INSERT INTO attendee (Name, phone, email) VALUES (?, ?, ?)';
    connection.query(sql, [Name, phone, email], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Adding Attendee');
        }
        res.render('registered', { attendeeId: results.insertId, Name, phone, email });
    });
});

app.get('/events/:id/update', function (req, res) {
    const eventId = parseInt(req.params.id);
    const sql = 'SELECT * FROM event WHERE eventId = ?';
    connection.query(sql, [eventId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving Event');
        }
        if (results.length > 0) {
            res.render('updateEvent', { event: results[0] });
        } else {
            res.status(404).send('Event Not Found');
        }
    });
});

app.post('/events/:id/update', upload.single('image'), (req, res) => {
    const eventId = req.params.id;

    const { name, details, date, start_time, end_time, venue, price } = req.body;

    let image = req.body.currentImage;
    if (req.file) {
        image = req.file.filename;
    }

    const sql = 'UPDATE event SET name = ?, details = ?, date = ?, start_time = ?, end_time = ?, venue = ?, price = ?, image = ? WHERE eventId = ?';
    
    connection.query(sql, [name, details, date, start_time, end_time, venue, price, image, eventId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Updating Event');
        }
        res.redirect('/');
    });
});

app.get('/events/:id/delete', function (req, res) {
    const eventId = parseInt(req.params.id);
    const sql = 'DELETE FROM event WHERE eventId = ?';
    connection.query(sql, [eventId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Deleting Event');
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
