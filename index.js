const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}

// database connect
let dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log("There was an error connecting to the DB: " + err);
});

// message model
var Message = mongoose.model('Message', {
    name: String,
    message: String,
})

const app = express();
const PORT = 3000;

// View engine setup
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// set paths
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/public/views'));

// routes
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/messages', (req, res) => {
    Message.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
})
app.post('/messages', (req, res) => {
    let message = new Message(req.body);
    message.save().then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})