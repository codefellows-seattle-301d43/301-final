'use strict';

const records = require('./records');
const express = require('express');
const ejs = require('ejs');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// =================================================================================
// ******************************** GET ROUTES *************************************
// =================================================================================

//Index
app.get('/', records.getIndex);

//About us
app.get('/about', records.getAbout);

//Get single patient info
app.get('/patient/:patientId', records.patientInfo);

//Get single record info
app.get('/record/:recordId', records.recordInfo);

//Analyze by sending a call to Text analysis API
app.get('/patient/:patientId/analyze', records.analyzeRecord);


// =================================================================================
// ******************************** POST ROUTES ************************************
// =================================================================================

//New patient
app.post('/patient', records.newPatient);

//New record
app.post('/record', records.newRecord);


// =================================================================================
// ******************************* DELETE ROUTES ***********************************
// =================================================================================

//Delete Patient
app.delete('/patient/:patientId', records.deletePatient);


// =================================================================================
// ******************************** 404 CATCHER ************************************
// =================================================================================

//Simple temp 404 catcher
app.get('*', (req, res) => {
  res.statusCode = 404;
  res.send('404, go away');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});