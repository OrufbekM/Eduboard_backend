const path = require('path');
const fs = require('fs');
const multer = require('multer');

const uploadRoot = path.join(__dirname, '..', '..', 'uploads', 'lessons');

const ensureUploadDir = () => {
  if (!fs.existsSync(uploadRoot)) {
    fs.mkdirSync(uploadRoot, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadDir();
    cb(null, uploadRoot);
  },
  filename: (req, file, cb) => {
    const safeExt = path.extname(file.originalname || '').toLowerCase();
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    return cb(null, true);
  }
  if (file.mimetype && file.mimetype.startsWith('video/')) {
    return cb(null, true);
  }
  if (file.mimetype && file.mimetype.startsWith('audio/')) {
    return cb(null, true);
  }
  cb(new Error('Only image, video, and audio files are allowed'));
};

const uploadLessonMedia = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 200,
  },
}).any();

module.exports = {
  uploadLessonMedia,
  uploadRoot,
};
