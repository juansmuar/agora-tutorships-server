const Tutor = require('../models/tutor.model');
const Review = require('../models/review.model');

const getTutorData = async (req, res) => {
  try {
    const tutor = await Tutor.findById({ _id: req.params.id });
    const {
      name,
      email,
      profilephoto,
      description,
      profession,
      focus,
      rating,
    } = tutor;
    const reviews = await Review.find({ tutorId: req.params.id }).populate(
      'studentId',
      'name',
    );
    const tutorData = {
      name,
      email,
      profilephoto,
      description,
      profession,
      focus,
      rating,
      reviews,
    };
    res.status(200).json(tutorData);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getTutorData };
