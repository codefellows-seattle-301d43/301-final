  'use strict';

const express = require('express');
const ejs = require('ejs');

const PORT = process.env.PORT;
const env = require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

//Index
app.get('/', (req, res) => {
  res.render('index');
});

//Simple temp 404 catcher
app.get('*', (req, res) => {
  res.statusCode = 404;
  res.send('404, go away');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});