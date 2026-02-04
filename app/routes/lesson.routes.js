const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { checkLessonExists, validateLessonData, checkLessonAccess } = require('../middleware/lesson.middleware');
const { uploadLessonMedia } = require('../middleware/lessonUpload.middleware');
const { createLesson, getAllLessons, getLessonById, updateLesson, deleteLesson } = require('../controllers/lesson.controller');
const { uploadLessonMedia: uploadLessonMediaAny } = require('../middleware/lessonMediaUpload.middleware');
const { createLessonMedia, getLessonMedia, updateLessonMedia, deleteLessonMedia } = require('../controllers/lessonMedia.controller');

router.post("/create", authMiddleware, uploadLessonMedia, validateLessonData, createLesson);
router.get("/", authMiddleware, getAllLessons);
router.get("/:id", authMiddleware, checkLessonExists, getLessonById);
router.put("/:id/update", authMiddleware, checkLessonExists, uploadLessonMedia, validateLessonData, updateLesson);
router.delete("/:id/delete", authMiddleware, checkLessonExists, deleteLesson);

router.post("/:id/media/create", authMiddleware, checkLessonAccess, uploadLessonMediaAny, createLessonMedia);
router.get("/:id/media", authMiddleware, checkLessonAccess, getLessonMedia);
router.put("/:id/media/:mediaId/update", authMiddleware, checkLessonAccess, uploadLessonMediaAny, updateLessonMedia);
router.delete("/:id/media/:mediaId/delete", authMiddleware, checkLessonAccess, deleteLessonMedia);

module.exports = router;
