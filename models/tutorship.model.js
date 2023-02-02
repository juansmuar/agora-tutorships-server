const mongoose = require('mongoose');

const tutorshipSchema = mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    date: {
      type: Date,
      required: true,
    },
    isRated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Tutorship = mongoose.model('Tutorship', tutorshipSchema);
module.exports = Tutorship;
