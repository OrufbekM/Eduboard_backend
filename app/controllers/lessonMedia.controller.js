const fs = require('fs');
const path = require('path');
const { LessonMedia } = require('../models');

const toPublicPath = (absolutePath) => {
  if (!absolutePath) return null;
  const relative = path.relative(path.join(__dirname, '..', '..'), absolutePath);
  return `/${relative.replace(/\\/g, '/')}`;
};

const guessType = (mimeType, fallback = 'file') => {
  if (!mimeType) return fallback;
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  return fallback;
};

const createLessonMedia = async (req, res) => {
  try {
    const lesson = req.lesson;
    const userId = req.user.id;
    const files = req.files || [];
    const { url, type } = req.body || {};

    if (!files.length && !url) {
      return res.status(400).json({ message: 'Media file or url is required' });
    }

    if (files.length) {
      const created = await Promise.all(files.map((file) => {
        const storagePath = toPublicPath(file.path);
        return LessonMedia.create({
          lessonId: lesson.id,
          userId,
          type: guessType(file.mimetype, type || 'file'),
          url: storagePath,
          storagePath,
          originalName: file.originalname,
          size: file.size,
          mimeType: file.mimetype,
        });
      }));

      return res.status(201).json(created);
    }

    const created = await LessonMedia.create({
      lessonId: lesson.id,
      userId,
      type: type || 'link',
      url,
      storagePath: null,
      originalName: null,
      size: null,
      mimeType: null,
    });

    return res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLessonMedia = async (req, res) => {
  try {
    const lesson = req.lesson;
    const media = await LessonMedia.findAll({
      where: { lessonId: lesson.id },
      order: [['id', 'ASC']],
    });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLessonMedia = async (req, res) => {
  try {
    const lesson = req.lesson;
    const { mediaId } = req.params;
    const { url, type } = req.body || {};
    const files = req.files || [];

    const media = await LessonMedia.findOne({
      where: { id: mediaId, lessonId: lesson.id },
    });

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    if (files.length) {
      const file = files[0];
      const storagePath = toPublicPath(file.path);

      if (media.storagePath) {
        const absoluteOld = path.join(__dirname, '..', '..', media.storagePath.replace(/^\//, ''));
        if (fs.existsSync(absoluteOld)) {
          fs.unlinkSync(absoluteOld);
        }
      }

      await media.update({
        type: guessType(file.mimetype, type || media.type),
        url: storagePath,
        storagePath,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      });

      return res.status(200).json(media);
    }

    if (url) {
      await media.update({
        type: type || media.type || 'link',
        url,
        storagePath: null,
        originalName: null,
        size: null,
        mimeType: null,
      });
    }

    return res.status(200).json(media);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLessonMedia = async (req, res) => {
  try {
    const lesson = req.lesson;
    const { mediaId } = req.params;
    const media = await LessonMedia.findOne({
      where: { id: mediaId, lessonId: lesson.id },
    });

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    if (media.storagePath) {
      const absolutePath = path.join(__dirname, '..', '..', media.storagePath.replace(/^\//, ''));
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }

    await media.destroy();
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLessonMedia,
  getLessonMedia,
  updateLessonMedia,
  deleteLessonMedia,
};
