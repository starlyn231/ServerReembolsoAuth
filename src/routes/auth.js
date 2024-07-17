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
 *               username:
 *                 type: string
 *                 description: "Nombre de usuario"
 *               password:
 *                 type: string
 *               roles:
 *                 type: string
 *               notifications:
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
router.post('/register', authenticateToken,register)

// POST api/v1/auth/login | public | login exixting user


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: "Nombre de usuario del usuario (opcional si se proporciona el correo electrónico)"
 *               password:
 *                 type: string
 *                 description: "Contraseña del usuario"
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
 *                     role:
 *                       type: string
 *       400:
 *         description: Faltan el correo electrónico o la contraseña
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

router.post('/login', login)

module.exports = router;
