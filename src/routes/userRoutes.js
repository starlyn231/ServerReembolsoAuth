const express = require("express");
const authenticateToken = require("../middlewares/validate-token");
const { getUserInfo, getAllUserInfo } = require("../controllers/userController");

const router = express.Router();


/**
 * @swagger
 *  /get/userinfo/{id}:
 *   get:
 *     summary: Obtener información de un usuario por su ID
 *     tags: [USER]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de username
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del usuario
 *                     username:
 *                       type: string
 *                       description: Nombre de usuario
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     roles:
 *                       type: integer
 *                     notifications:
 *                       type: boolean
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.get('/get/userinfo/:id',authenticateToken,getUserInfo)

/**
 * @swagger
 * /get/getAllUser:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [USER]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos cargados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: Nombre de usuario
 *                     password:
 *                       type: string
 *                     roles:
 *                       type: string
 *                     notifications:
 *                       type: boolean
 *                       default: true
 *       500:
 *         description: Error del servidor
 */

router.get('/get/getAllUser',authenticateToken, getAllUserInfo)
module.exports = router;
