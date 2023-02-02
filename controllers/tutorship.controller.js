/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');
const Tutorship = require('../models/tutorship.model');
const sendEmail = require('../utils/sendEmail');

const createTutorship = async (req, res, next) => {
  try {
    const {
      email, tutorId, date, time,
    } = req.body;
    const student = await Student.findOne({ email });
    if (student) {
      const newDate = `${date}T${time}:00.000z`;
      const tutorship = await Tutorship.create({
        studentId: student._id, date: newDate, tutorId,
      });
      const tutor = await Tutor.findOne({ _id: tutorId });
      res.status(200).json(tutorship);
      // Send Email Student
      sendEmail({
        user: student,
        template: 'd-c81fed9ad95d4740a44b1f7760976fe9',
        templateData: {
          'student': student.name,
          'tutor': tutor.name,
          'subject': tutor.focus,
          'date': newDate.slice(0, 10),
          'status': 'created but is pending for payment',
          'url': 'https://agora-projectagora2021-gmailcom.vercel.app/profile/tutorships',
        },
      });
      // Send Email Tutor
      sendEmail({
        user: tutor,
        template: 'd-4347de2b9f6c4d129c7c53f5a29d99dd',
        templateData: {
          'student': student.name,
          'tutor': tutor.name,
          'date': newDate.slice(0, 10),
          'status': 'created but is pending for payment',
          'url': 'https://agora-projectagora2021-gmailcom.vercel.app/profile/tutorships',
        },
      });
      next();
    } else {
      res.status(400).json({ message: 'Student email not found' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTutorships = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = (await Student.findOne({ _id: id }))
      || (await Tutor.findOne({ _id: id }));
    const userType = user.focus ? 'tutorId' : 'studentId';
    const tutorships = await Tutorship.find({ [userType]: user.id }).populate('tutorId').populate('studentId').exec();
    res.status(200).json(tutorships);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createTutorship, getTutorships };