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
      res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
    }else{
      res.render('index', {patients: serverRes.rows});
    }
  });
};


const getAbout = (req, res) => {
  console.log('about us, boring..');
};


const patientInfo = (req, res) => {
  let SQL = 'SELECT * FROM patients WHERE id = $1';
  let values = [req.params.patientId];
  client.query(SQL, values, (err, patientRes) => {
    if(err){
      console.error(err);
      res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
    } else {
      SQL = "SELECT id, TO_CHAR(date, 'mon dd, yyyy') AS date, title FROM records WHERE patient_id = $1 ORDER BY id DESC";
      client.query(SQL, values, (err, recordsRes) => {
        if(err){
          console.error(err);
          res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
        } else {
          res.render('pages/patient', {patient: patientRes.rows[0], records: recordsRes.rows, added: !!req.query.added});
        }
      });
    }
  });
};


const recordInfo = (req, res) => {
  let SQL = "SELECT id, TO_CHAR(date, 'mon dd, yyyy') AS date, title, description FROM records WHERE id = $1";
  let values = [req.params.recordId];
  client.query(SQL, values, (err, serverRes) => {
    if(err){
      console.error(err);
      res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
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
  let SQL = 'INSERT INTO patients (first_name, last_name) VALUES ($1,$2) ON CONFLICT DO NOTHING RETURNING id';
  let values = [req.body.first_name, req.body.last_name];
  client.query(SQL, values, (err, serverRes) => {
    if(err){
      console.error(err);
      res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
    }else{
      res.redirect(`/patient/${serverRes.rows[0].id}?added=true`);
    }
  })
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