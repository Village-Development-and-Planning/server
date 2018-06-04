const express = require('express');
const app = new express.Router();
import dispatcher from './dispatcher';

import SurveyorController from '../controllers/SurveyorController';
import AnswerController from '../controllers/AnswerController';
import SurveyController from '../controllers/SurveyController';

app.get('/auth', dispatcher(SurveyorController, 'auth'));
app.post('/upload', dispatcher(AnswerController, 'create'));
app.get('/download', dispatcher(SurveyController, 'index'));
app.get('/download/:id', dispatcher(SurveyController, 'get'));

app.get('/info', dispatcher(SurveyorController, 'appInfo'));

//  (req, res, next) => {
//   res.sendFile(path.resolve('data/auth.json'));
// })

module.exports = app;
