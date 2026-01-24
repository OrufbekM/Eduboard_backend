const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

const signupValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').notEmpty().withMessage('Confirm password is required')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const refreshTokenValidation = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required')
];

router.post('/signup', signupValidation, AuthController.signup);
router.post('/login', loginValidation, AuthController.login);
router.post('/refresh-token', refreshTokenValidation, AuthController.refreshToken);
router.post('/logout', authMiddleware, AuthController.logout);
router.get('/profile', authMiddleware, AuthController.getProfile);

module.exports = router;
