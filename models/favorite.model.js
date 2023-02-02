/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Tutor = require('./tutor.model');
const Student = require('./student.model');

const favoriteSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
