'use strict';

const pg = require('pg');
require('dotenv').config();
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);

client.connect();
client.on('error', error => console.log(error));

const superagent = require('superagent');

const getIndex = (req, res) => {
  console.log('im at index woohoo');
  res.render('index');
};

module.exports = {
  getIndex: getIndex
};