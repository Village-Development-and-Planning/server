const express = require('express');
const app = new express.Router();
import dispatcher from './dispatcher';

import SurveyorController from '../controllers/SurveyorController';

app.get('/auth', dispatcher(SurveyorController, 'auth'));
console.log('[APP] Registered @ /auth');
//  (req, res, next) => {
//   res.sendFile(path.resolve('data/auth.json'));
// })

module.exports = app;
