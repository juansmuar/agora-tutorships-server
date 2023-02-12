const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/student.model');
const Tutor = require('../models/tutor.model');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const updateProfile = async (req, res, next) => {
  try {
    const {
      name, email, password, description, schedule, price,
    } = req.body.inputs;
    const { url, token, type } = req.body;
    const userSchema = type === 'student' ? Student : Tutor;
    const userExists = await userSchema.findOne({ email });
    if (userExists) {
      res.status(409).send('Sorry... email is alredy taken');
      next();
    } else {
      const { userData } = jwt.verify(token, 'secret key');
      const newPassword = password && (await bcrypt.hash(password, 10));
      await userSchema.updateOne(
        { _id: userData._id },
        {
          name: name || userData.name,
          email: email || userData.email,
          password: newPassword || userData.password,
          profilephoto: url || userData.profilephoto,
          description: description || userData.description,
          schedule: schedule || userData.schedule,
          price: price || userData.price,
        },
      );
      const newUserData = await userSchema.findOne({ _id: userData._id });
      const newToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
          userId: newUserData._id,
          type,
          userData: newUserData,
        },
        'secret key',
      );
      res.json(newToken);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// eslint-disable-next-line consistent-return
const updateProfileImage = async (req, res) => {
  try {
    const { path, size } = req.file;
    const maxSize = 1024 * 1024 * 5;

    if (size > maxSize) {
      fs.unlinkSync(path);
      return res.status(400).json({ message: 'File is too large' });
    }

    try {
      const result = await cloudinary.uploader.upload(path, {
        folder: 'profilePictures',
        use_filename: true,
        unique_filename: false,
      });
      const { url } = result;
      return res.status(200).send(url);
    } catch (error) {
      res.status(200).send(null);
    } finally {
      fs.unlinkSync(path);
    }
  } catch (error) {
    res.status(200).send(null);
  }
};

module.exports = { updateProfile, updateProfileImage };
