const express = require('express');
const tutorshipController = require('../controllers/tutorship.controller');

const tutorship = express.Router();

tutorship.post('/tutorship', tutorshipController.createTutorship);
tutorship.post('/sendAppointment', tutorshipController.createTutorship);
tutorship.get('/tutorships/:id', tutorshipController.getTutorships);
tutorship.post('/cancelTutorship', tutorshipController.cancelTutorship);

module.exports = tutorship;
