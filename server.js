'use strict';

const records = require('./records');
const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs'); // eslint-disable-line

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.set('view engine', 'ejs');

// =================================================================================
// ******************************** GET ROUTES *************************************
// =================================================================================

//Index
app.get('/', records.getIndex);
// You use singular nouns instead of plural in all your routes; convention is plural.
app.get('/patient', records.getPatients);

//About us
app.get('/about', records.getAbout);

//Get single patient info (demographics and records)
app.get('/patient/:patientId', records.patientInfo);

//Get single record info
// The normal nested structure for this would be /patients/:patientId/records/:recordId
app.get('/record/:patientId/:recordId', records.recordInfo);


// =================================================================================
// ******************************** POST ROUTES ************************************
// =================================================================================

//Analyze by sending a call to Text analysis API
app.post('/patient/:patientId/analyze', records.analyzeRecord);

//New patient
app.post('/patient', records.newPatient);

//New record
app.post('/record', records.newRecord);


// =================================================================================
// ******************************* DELETE ROUTES ***********************************
// =================================================================================

//Delete Patient
app.delete('/patient/:patientId', records.deletePatient);

//Delete Record
app.delete('/record/:recordId', records.deleteRecord);


// =================================================================================
// ******************************** 404 CATCHER ************************************
// =================================================================================

// not so temp after all?
// I have a personal policy to never mark anything as "temporary" in a comment,
// because it usually turns me into a liar.
//Simple temp 404 catcher
app.get('*', (req, res) => {
  res.statusCode = 404;
  res.render('pages/error', {message: '404: We can\'t find what you requested'});
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
