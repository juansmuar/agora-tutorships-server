const Students = require('../models/student.model');

const getStudents = async (req, res) => {
  try {
    const students = await Students.find({ _id: req.params.id }, ['name', 'profilephoto']);
    res.send({ students });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { getStudents };
