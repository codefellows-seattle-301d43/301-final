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

const recordInfo = (req, res) => {
  console.log('record time, be chillio');
};

const analyzeRecord = (req, res) => {
  console.log('magic gon happen');
};

const newPatient = (req, res) => {
  console.log('im new patient take it easy');
};

const newRecord = (req, res) => {
  console.log('new record, plz no big bills');
};

const deletePatient = (req, res) => {
  console.log('DEL.... bai have a good time');
};


module.exports = {
  getIndex: getIndex,
  getAbout: getAbout,
  patientInfo: patientInfo,
  recordInfo: recordInfo,
  analyzeRecord: analyzeRecord,
  newPatient: newPatient,
  newRecord: newRecord,
  deletePatient: deletePatient
};