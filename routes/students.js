const express = require('express');
const Controller = require('../controllers/students.controller');

const app = express.Router();

app.get('/students/:id', Controller.getStudents);

module.exports = app;
