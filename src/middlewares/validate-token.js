const jwt = require('jsonwebtoken')


function authenticateToken(req, res, next) {
    // Obtén el token del encabezado de la solicitud
    const authHeader = req.headers['authorization'];
    
    console.log( 'TOKENNN',req.headers)
    const token = authHeader && authHeader.split(' ')[1];
  
  
    if (!token) {
        return res.status(401).json({ message: 'Token is required!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('ERROR:', err)
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token ha expirado' });
            } else {
                return res.status(403).json({ message: 'Token no es valido' });
            }
        }
        req.user = user;
        next();
    });
    
  }


module.exports = authenticateToken;