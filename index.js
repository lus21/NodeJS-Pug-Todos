require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import initalizeRoutes from './routes';

import { connect } from  './db';

connect()
	.then(() =>{
		console.log('MongoDb');
	});
const app = express();




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