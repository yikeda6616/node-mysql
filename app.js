/*
 * Primary file for the App
 *
 */

// Dependencies
import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import path from 'path';

import { getHomePage } from './routes/index';
import {
  addPlayerPage,
  addPlayer,
  deletePlayer,
  editPlayer,
  editPlayerPage
} from './routes/player';
import { config } from './config';

const app = express();
const port = 5000;

// Create connection to database
// The mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
// MAMP needs port number as well.
const db = mysql.createConnection(config);

// Connect to database
db.connect(err => {
  if (!err) {
    console.log('Connected to database');
  } else {
    throw err;
  }
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);

// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
