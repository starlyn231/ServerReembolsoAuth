const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Endpoint varify token
router.post('/verifyToken', (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  console.log('token backen B',authHeader)
    if (!token) {
      return res.status(401).json({ message: 'Token is required!' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({ message: 'Token ha expirado' });
        } else {
          return res.status(403).json({ message: 'Token no es válidoe' });
        }
      }
      res.json({ user });
    });
  });
  
  
router.post('/refreshToken', (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
      return res.status(401).json({ message: 'Token de refresco es requerido!' });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          return res.status(403).json({ message: 'Token no es valido' });
      }

      const accessToken = jwt.sign(
          { userId: user.userId },
          process.env.JWT_SECRET,
          { expiresIn: '60s' }
      );

      res.json({ accessToken: accessToken });
  });
})

  module.exports = router;