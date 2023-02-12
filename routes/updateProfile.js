const express = require('express');
const multer = require('multer');
const Controller = require('../controllers/updateProfile.controller');

const app = express.Router();

app.patch('/update', Controller.updateProfile);

const upload = multer({ dest: './uploads' });

app.patch('/uploadProfileImage', upload.single('image'), Controller.updateProfileImage);

module.exports = app;
