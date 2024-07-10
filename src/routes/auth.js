const express = require("express");
const authenticateToken = require("../middlewares/validate-token");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// POST api/v1/auth/register | public | register new user

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               Password:
 *                 type: string
 *               rol:
 *                 type: string
 *               notificationsWithEmail:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newUser:
 *                   type: object
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Missing required fields or user already exists
 *       500:
 *         description: Server error
 */
router.post('/register', register)

// POST api/v1/auth/login | public | login exixting user


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 tokenCreationDate:
 *                   type: string
 *                 tokenExpiryDate:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 refreshTokenCreationDate:
 *                   type: string
 *                 refreshTokenExpiryDate:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/login', login)

module.exports = router;
