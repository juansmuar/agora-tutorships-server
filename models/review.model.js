const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
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
  tutorshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorship',
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
