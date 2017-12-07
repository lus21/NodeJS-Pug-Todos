require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();

const initalizeRoutes = require('./routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan("combined"));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(__dirname + '/public'));


initalizeRoutes(app);


app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`)
});