import dispatcher from './dispatcher';
import StaticController from '../controllers/StaticController';
const express = require('express');
const app = new express.Router();

app.post('/', dispatcher(StaticController, 'upload'));
module.exports = app;
