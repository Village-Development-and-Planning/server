const express = require('express');
const app = new express.Router();
import path from 'path';

app.get('/auth', (req, res, next) => {
  res.sendFile(path.resolve('data/auth.json'));
})

module.exports = app;
