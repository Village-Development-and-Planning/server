const express = require('express');
const app = new express.Router();
import dispatcher from './dispatcher';

import SurveyorController from '../controllers/SurveyorController';
import AnswerController from '../controllers/AnswerController';
import SurveyController from '../controllers/SurveyController';

app.get('/auth', dispatcher(SurveyorController, 'auth'));
console.log('[APP] Registered @ /auth');

app.post('/upload', dispatcher(AnswerController, 'create'));
console.log('[APP] Registered @ /upload');

app.get('/download', dispatcher(SurveyController, 'index'));
console.log('[APP] Registered @ /download');
app.get('/download/:id', dispatcher(SurveyController, 'get'));
console.log('[APP] Registered @ /download/:id');

//  (req, res, next) => {
//   res.sendFile(path.resolve('data/auth.json'));
// })

module.exports = app;
