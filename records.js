'use strict';

const pg = require('pg');
require('dotenv').config();

const conString = process.env.DATABASE_URL;
const authKey = process.env.KEY;

const client = new pg.Client(conString);

client.connect();
client.on('error', error => console.log(error));

const superagent = require('superagent');


const getIndex = (req, res) => {
  res.redirect('/patient');
};


const getPatients = (req, res) => {
  let SQL = 'SELECT * FROM patients';
  client.query(SQL, (err, serverRes) => {
    if(err){
      console.error(err);
      res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
    }else{
      res.render('index', {
        patients: serverRes.rows,
        deleted: !!req.query.deleted
      });
    }
  });
};


const getAbout = (req, res) => {
  res.render('pages/about');
};


const patientInfo = (req, res) => {
  let SQL = 'SELECT * FROM patients WHERE id = $1';
  let values = [req.params.patientId];
  client.query(SQL, values, (err, patientRes) => {
    if(err){
      console.error(err);
      res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
    } else {
      // fancy!
      SQL = 'SELECT id, TO_CHAR(date, \'mon dd, yyyy\') AS date, title FROM records WHERE patient_id = $1 ORDER BY id DESC';
      client.query(SQL, values, (err, recordsRes) => {
        if(err){
          console.error(err);
          res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
        } else {
          res.render('pages/patient', {
            patient: patientRes.rows[0],
            records: recordsRes.rows,
            added: !!req.query.added,
            deleted: !!req.query.deleted
          });
        }
      });
    }
  });
};


const recordInfo = (req, res) => {
  let SQL = 'SELECT id, TO_CHAR(date, \'mon dd, yyyy\') AS date, title, description FROM records WHERE id = $1';
  let values = [req.params.recordId];
  client.query(SQL, values, (err, serverRes) => {
    if(err){
      console.error(err);
      res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
    }else{
      res.render('pages/recordDetail', {
        record: serverRes.rows[0],
        added: !!req.query.added,
        patient_id: req.params.patientId
      });
    }
  });
};


const analyzeRecord = (req, res) => {
  let SQL = 'SELECT id, title, description FROM records WHERE patient_id = $1;';
  let values = [req.params.patientId];
  client.query(SQL, values, (err, data) => {
    if(err) {
      res.render('pages/error', {message: err});
    } else {
      let analysisData = data.rows.map(data => {
        //Format the data to acceptable params for MSFT API
        return {language: 'en', id: data.id, text: `${data.title} ${data.description}` };
      });

      let reqData = {documents: analysisData };
      if (reqData.documents.length === 0) {
        res.render('pages/keyPhrases', {phrases: ['Patient has no records to analyze'], patient_id: req.params.patientId});
      } else {
        superagent.post('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases')
          .set('Ocp-Apim-Subscription-Key', authKey)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .send(reqData)
          .then(apiResponse => {
            let phraseList = JSON.parse(apiResponse.text).documents;

            // Concat the result arrays together
            // i'm so proud of your mapping
            let allPhrasesFromRecords = phraseList.reduce((total,phraseList) => total.concat(phraseList.keyPhrases),[]);
            let allPhrasesSet = new Set(allPhrasesFromRecords);

            //Filter list for some unwanted phrases
            // These seem super-manual--this makes me worried about how "hacky" your app is.
            let filterList = [req.body.firstName, req.body.lastName, 'year', 'years', 'day', 'days', 'month', 'months', 'home', 'year-old gentleman', 'yo woman', 'woman', 'man'];


            //Find all repeated words
            let allPhrases = Array.from(allPhrasesSet);

            //Ranks array of objects according to frequency of appearance
            // Oof, so this makes an array that'll contain every repeated phrase n times... and it'll take n^2 time...
            // I'd much rather do a basic phrase count:
            // allPhrases.reduce( (ans, x) => {
            //     if(x in ans){
            //       ans[x] = ans[x] + 1;
            //     } else {
            //       ans[x] = 1;
            //     }
            //     return ans;
            //  }, {});
            // then you could use Object.entries(), but importantly, it's now two n-time operations instead of an n^2 operation.
            // you could also do the filter first to cut down on the amount of work you need to do.
            let mostFrequentPhrases = allPhrases.map((phrase) => {
              let count = 0;
              for(let i=0; i < allPhrasesFromRecords.length; i++){
                if(allPhrasesFromRecords[i] === phrase) count++;
              }
              return {name: phrase, total: count};
            }).sort((a,b) => b.total - a.total).filter(item => !filterList.includes(item.name));

            //Take the first 5 items in sorted list, then format to prepare for db storage
            let phraseTagList = mostFrequentPhrases.slice(0,5).map(phrase => `<li class="keyword">${phrase.name}</li>` ).join('\n');

            //Format for easier rendering on keyPhrase page.
            // You never need to use a template literal like this! Can just be word => word.name
            let formattedPhraseList = mostFrequentPhrases.map(word => `${word.name}`);

            //Query to update patient's keyphrases
            SQL = 'UPDATE patients SET key_phrase = $1 WHERE id = $2;';
            values = [phraseTagList, req.params.patientId];

            client.query(SQL, values, (err) => {
              if (err) {
                res.render('pages/error', {message: err});
              } else {
                res.render('pages/keyPhrases', {phrases: formattedPhraseList, patient_id: req.params.patientId});
              }
            });
          });
      }
    }
  });
};


const newPatient = (req, res) => {
  let SQL = 'INSERT INTO patients (first_name, last_name) VALUES ($1,$2) ON CONFLICT DO NOTHING RETURNING id';
  let values = [req.body.first_name, req.body.last_name];
  // serverRes is a really weird parameter name for database results
  client.query(SQL, values, (err, serverRes) => {
    if(err){
      console.log(values);
      console.error(err);
      res.render('pages/error', {message: err});
    }else{
      res.redirect(`/patient/${serverRes.rows[0].id}?added=true`);
    }
  });
};


const newRecord = (req, res) => {
  let SQL = 'INSERT INTO records (patient_id, title, description) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING id';
  let values = [req.body.patient_id, req.body.title, req.body.description];
  client.query(SQL, values, (err, serverRes) => {
    if(err){
      console.error(err);
      res.render('pages/error', {message: err});
    }else{
      res.redirect(`/record/${req.body.patient_id}/${serverRes.rows[0].id}?added=true`);
    }
  });
};


const deletePatient = (req, res) => {
  let SQL = 'DELETE FROM patients WHERE id = $1';
  let values = [req.params.patientId];
  client.query(SQL, values, (err) => {
    if(err){
      console.error(err);
      res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
    }else{
      res.redirect('/patient?deleted=true');
    }
  });
};

const deleteRecord = (req, res) => {
  let SQL = 'DELETE FROM records WHERE id = $1';
  let values = [req.params.recordId];
  client.query(SQL, values, (err) => {
    if(err){
      console.error(err);
      res.render('pages/error', {message: 'Server Error: We could not handle your request. Sorry!'});
    }else{
      res.redirect(`/patient/${req.body.patientId}?deleted=true`);
    }
  });
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
  deletePatient: deletePatient,
  deleteRecord: deleteRecord
};
