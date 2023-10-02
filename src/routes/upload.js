const express = require('express');
const multer = require('multer');
const { uploadVideo, uploadImage } = require('../Controller/uploadController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/video', upload.single('video'), uploadVideo);
router.post('/image', upload.single('image'), uploadImage);

module.exports = router;
