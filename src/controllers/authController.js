const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { format } = require("date-fns");

const register = async (req, res) => {
    console.log("object of auth__", req.body);
    try {
        const { email, Password, notificationsWithEmail, rol } = req.body;
        //let userName = email;
        console.log(email, Password, notificationsWithEmail, rol);
        if (!email || !Password) {
          return res.status(400).json({
            msg: "Por favor, rellene los campos requeridos", 
            success: false,
          });
        }
    
        let user = await User.findOne({
          where: {
            /* In the provided code snippet, the variable `email` is
        being used incorrectly. */
            email,
          },
        });
        if (user) {
          return res.status(400).json({
            msg: "El usuario ya existe",
            success: false,
          });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const newUser = await User.create({
          Username: email,
          Email: email,
          PasswordHash: hashedPassword,
          NotificationsWithEmail: notificationsWithEmail,
          Rol: rol,
        });
        res.status(200).json({ newUser, success: true });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const login = async(req, res) => {
    console.log('login',req.body);
    try {
        const { email, Password } = req.body;
    
        if (!email || !Password) {
          console.log("Faltan email o contraseña");
          return res
            .status(400)
            .json({ message: "Email y contraseña son requeridos", success: false });
        }
    
        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
    
        const isMatch = await bcrypt.compare(
          Password,
          user.dataValues.PasswordHash
        );
        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Contraseña incorrecta", success: false });
        }
      
        const tokenExpiration = 86400; // en segundos
        const refreshTokenExpiration =259200; // en segundos (3 días)
    
       const token = jwt.sign(
          { userId: user.dataValues.Id },
         process.env.JWT_SECRET,
        { expiresIn: tokenExpiration}
         );
       
         const refreshToken = jwt.sign(
          { userId: user.dataValues.Id },
         process.env.JWT_SECRET,
        { expiresIn: refreshTokenExpiration}
         );
     
    
        let userData = {
          Id: user.dataValues.Id,
          Username: user.dataValues.Username,
          Email: user.dataValues.Email,
          Rol: user.dataValues.Rol,
        };
        const currentTime = new Date();
        console.log(currentTime)
    
        const tokenExpiryDate = new Date(currentTime.getTime() + tokenExpiration * 1000);
        const refreshTokenExpiryDate = new Date(currentTime.getTime() + refreshTokenExpiration * 1000);
    
        // Formateo de las fechas
        const formattedCurrentTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
        const formattedTokenExpiryDate = format(tokenExpiryDate, 'yyyy-MM-dd HH:mm:ss');
        const formattedRefreshTokenExpiryDate = format(refreshTokenExpiryDate, 'yyyy-MM-dd HH:mm:ss');
    
        res.status(200).json({
          msg: "Inicio de sesión exitoso",
          success: true,
          token,
          tokenCreationDate: formattedCurrentTime,
          tokenExpiryDate: formattedTokenExpiryDate,
          refreshToken,
          refreshTokenCreationDate: formattedCurrentTime,
          refreshTokenExpiryDate: formattedRefreshTokenExpiryDate,
          data: userData,
        });
      } catch (error) {
        console.error("Error en la autenticación:", error);
        next(error); // Pasa el error al middleware de manejo de errores
      }
  
}


module.exports={
    register,
    login
}