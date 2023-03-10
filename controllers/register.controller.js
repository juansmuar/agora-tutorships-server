const jwt = require('jsonwebtoken');
const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config({ path: '../.env' });

const createUser = async (req, res) => {
  try {
    const { type, inputs } = req.body;

    let UserSchema = '';
    UserSchema = type === 'student' ? Student : Tutor;

    const user = await new UserSchema(inputs);
    await user.save();

    const token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
        userId: user._id,
        type: `${type}`,
        userData: user,
      },
      'secret key',
    );
    const userInfo = { token, userData: user };
    res.status(201).json(userInfo);
    sendEmail({
      user,
      // template: 'd-0bc86a7e18464b9191cb127be79f094c',
      // templateData: { name: user.name },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(`Error: ${err}`);
  }
};

module.exports = { createUser };
