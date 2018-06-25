import dispatcher from './dispatcher';

import Answer from '../models/Answer';
import Artifact from '../models/Artifact';
import Location from '../models/Location';
import Process from '../models/Process';
import Statistic from '../models/Statistic';
import Survey from '../models/Survey';

import DBController from '../controllers/DBController';

const express = require('express');
const app = new express.Router();

const Models = {
  answers: Answer,
  artifacts: Artifact,
  locations: Location,
  processes: Process,
  statistics: Statistic,
  surveys: Survey,
};

Object.keys(Models).forEach((key) => {
  app.post(`/${key}/find`, dispatcher(DBController, 'find', Models[key]));
  app.post(`/${key}/update`, dispatcher(DBController, 'update', Models[key]));
  app.post(`/${key}/remove`, dispatcher(DBController, 'remove', Models[key]));
  app.post(`/${key}/create`, dispatcher(DBController, 'create', Models[key]));
});

module.exports = app;
