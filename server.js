const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(express.static('public'));
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api', require('./routes/routes'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Read Me' });
});

app.listen(process.env.PORT || 5000, () =>
    console.log("App listening on port 5000!\n\n\n")
);

module.exports = app;
