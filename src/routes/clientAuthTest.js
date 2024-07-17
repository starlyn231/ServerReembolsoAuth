const express = require("express");
const authenticateToken = require("../middlewares/validate-token");
const { getClientTest } = require("../controllers/testController");
const router = express.Router();




router.get('/clients', authenticateToken,getClientTest)

module.exports = router;