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

const getAbout = (req, res) => {
  console.log('about us, boring..');
};

const patientInfo = (req, res) => {
  console.log('hi i am a patient, fear me');
};

module.exports = {
  getIndex: getIndex,
  getAbout: getAbout,
  patientInfo: patientInfo
};