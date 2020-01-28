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

app.get('/add', (req, res) => {
	res.render('add');
})

app.post('/add', (req, res) => {
	const { title, country } = req.body;

	data.push({ ID: data.length + 1, Title: title, Country: country });
	fs.writeFileSync('./data/series.json', JSON.stringify(data, null, 4));
	res.redirect('/');
})

app.listen(port, () => console.log(`json-bread listening on port ${port}!`));
