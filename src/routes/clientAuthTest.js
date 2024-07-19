const express = require("express");
const authenticateToken = require("../middlewares/validate-token");
const { getClientTest } = require("../controllers/testController");
const router = express.Router();


/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Test API for get clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data load successfully
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
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                  
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */



router.get('/clients', authenticateToken,getClientTest)

module.exports = router;