const express = require('express');
const app = new express.Router();
import dispatcher from './dispatcher';

import SurveyorController from '../controllers/SurveyorController';
import AnswerController from '../controllers/AnswerController';
import SurveyController from '../controllers/SurveyController';
import ArtifactController from '../controllers/ArtifactController';

app.get('/auth', dispatcher(SurveyorController, 'auth'));
app.post('/upload', dispatcher(AnswerController, 'create'));
app.get('/download', dispatcher(SurveyController, 'index'));
app.get('/download/:id', dispatcher(SurveyController, 'get'));

app.get('/info', dispatcher(SurveyorController, 'appInfo'));
app.get('/surveys/:id', dispatcher(SurveyController, 'get'));
app.get('/artifacts/:id', dispatcher(ArtifactController, 'get'));
app.post('/response', dispatcher(AnswerController, 'create'));

module.exports = app;
