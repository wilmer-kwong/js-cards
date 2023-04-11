const express = require('express')
const path = require('path')

const app = express();
const PORT = 3000;

// View engine setup
app.set('view engine', 'ejs');

// set paths
//app.use('/css', express.static('public/css'));
// app.use('/js', express.static('public/js'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/public/views'));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})