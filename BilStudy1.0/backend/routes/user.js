const express = require('express')
const { signupUser, loginUser} = require('../controllers/userController')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password of the user (hashed)
 *         username:
 *           type: string
 *           description: Username of the user
 *     LoginResponse:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the authenticated user
 *         password:
 *           type: string
 *           description: Password of the user (should be removed from the response)
 *         username:
 *           type: string
 *           description: Username of the authenticated user
 *     SignupResponse:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the registered user
 *         token:
 *           type: string
 *           description: JWT authentication token
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */
router.post('/login', loginUser)
/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupResponse'
 *       400:
 *         description: Invalid email, password, or username
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */
router.post('/signup', signupUser)

module.exports = router