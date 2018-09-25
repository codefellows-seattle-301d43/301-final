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
  res.redirect('/patient');
};


const getPatients = (req, res) => {
  let SQL = 'SELECT * FROM patients';
  client.query(SQL, (err, serverRes) => {
    if(err){
      console.error(err);
      res.redirect('/pages/error');
    }else{
      res.render('index', {patients: serverRes.rows});
    }
  });
};


const getAbout = (req, res) => {
  console.log('about us, boring..');
};


const patientInfo = (req, res) => {
  console.log('hi i am a patient, fear me');
};


const recordInfo = (req, res) => {
  let SQL = 'SELECT * FROM records WHERE id = $1';
  let values = [req.params.recordId];
  client.query(SQL, values, (err, serverRes) => {
    if(err){
      console.error(err);
      res.redirect('/pages/error');
    }else{
      res.render('pages/recordDetail', {record: serverRes.rows[0]});
    }
  });
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
  getPatients: getPatients,
  getAbout: getAbout,
  patientInfo: patientInfo,
  recordInfo: recordInfo,
  analyzeRecord: analyzeRecord,
  newPatient: newPatient,
  newRecord: newRecord,
  deletePatient: deletePatient
};