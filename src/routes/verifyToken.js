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
          return res.status(401).json({ message: 'Token ha expirado' });
        } else {
          return res.status(403).json({ message: 'Token no es válido' });
        }
      }
      res.json({ user });
    });
  });
  
  
router.post('/refreshToken', (req, res) => {
  //const refreshToken = req.headers['authorization']; 
  const refreshToken = req.body.token;

console.log('refreshToken:',refreshToken)
console.log('req',req.body)
  if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token is required!' });
    }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'RefreshToken ha expirado' });
      } else {
        return res.status(403).json({ message: 'RefreshToken no es válido' });
      }
    }
    const refreshTokenExpiration = 5 * 24 * 60 * 60; // 5 días en segundos
// Payload para el token de acceso
const accessTokenPayload = {
  nbf: Math.floor(Date.now() / 1000), // Fecha de inicio de validez (nbf)
  exp: Math.floor(Date.now() / 1000) + refreshTokenExpiration, // Fecha de expiración (exp)
  iss: "https://oauthwws.azurewebsites.net/api/v1/auth/login",
  aud: "https://oauthwws.azurewebsites.net/api/v1/auth/login",
 // userId: user.dataValues.id,
};
 
    const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });
    console.log('access', accessToken)


      res.json({ accessToken: accessToken });
  });
})

  module.exports = router;