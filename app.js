const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const readJson = fs.readFileSync('./data/series.json');
const data = JSON.parse(readJson);

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
	res.render('index', { data });
});

app.listen(port, () => console.log(`json-bread listening on port ${port}!`));
