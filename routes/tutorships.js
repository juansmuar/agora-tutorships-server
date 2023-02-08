const express = require('express');
const tutorshipController = require('../controllers/tutorship.controller');

const tutorship = express.Router();

tutorship.post('/tutorship', tutorshipController.createTutorship);
tutorship.post('/sendAppointment', tutorshipController.createAppoiment);
tutorship.get('/tutorships/:id', tutorshipController.getTutorships);

module.exports = tutorship;
