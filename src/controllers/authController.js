const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { format } = require("date-fns");

const register = async (req, res) => {
  console.log("object of auth__", req.body);
  try {
    const { email, username, password, notifications, roles } = req.body;
    //let userName = email;
    console.log(email, password, notifications, roles);

    if ((!email && !username) || !password) {
      return res.status(400).json({
        message: "Por favor, rellene los campos requeridos",
        success: false,
      });
    }

    let user;
    if (email) {
      user = await User.findOne({
        where: { email },
      });
    } else if (username) {
      user = await User.findOne({
        where: { username  },
      });
    }

    if (user) {
      return res.status(400).json({
        message: "El usuario ya existe",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username: username || null,
      email: email || null,
      password: hashedPassword,
      notifications,
      roles
    });
    res.status(200).json({
      message: "Usuario creado exitosamente",
     // success: true,
      user: email || username
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  console.log("login", req.body);
  try {
    const { email, password, username } = req.body;
    if ((!email && !username) || !password) {
      console.log("Faltan email o contraseÃ±a");
      return res
        .status(400)
        .json({
          message: "Email/Username y contraseÃ±a son requeridos",
          success: false,
        });
    }

    let user;
   
      console.log(' email:', email)
    if (email) {
      user = await User.findOne({ where: { email } });
    } else if (username) {
      user = await User.findOne({ where: { username } });
    }
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(
      password,
      user.dataValues.password
    );
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "ContraseÃ±a incorrecta", success: false });
    }

    const tokenExpiration = 24 * 60 * 60; // 1 día en segundos
    const refreshTokenExpiration = 5 * 24 * 60 * 60; // 5 días en segundos
    const payload = {
      nbf: Math.floor(Date.now() / 1000), // Fecha de inicio de validez (nbf)
      exp: (exp = Math.floor(Date.now() / 1000) + tokenExpiration), // Fecha de expiraciÃ³n (exp), 1 hora desde ahora
      iss: "https://oauthwws.azurewebsites.net/api/v1/auth/login",
      aud: "https://oauthwws.azurewebsites.net/api/v1/auth/login",
      userId: user.dataValues.Id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    // Payload para el refresh token
const refreshTokenPayload = {
  nbf: Math.floor(Date.now() / 1000), // Fecha de inicio de validez (nbf)
  exp: Math.floor(Date.now() / 1000) + refreshTokenExpiration, // Fecha de expiración (exp)
  iss: "https://oauthwws.azurewebsites.net/api/v1/auth/refresh",
  aud: "https://oauthwws.azurewebsites.net/api/v1/auth/refresh",
  userId: user.dataValues.id,
};
      
const refreshToken = jwt.sign(refreshTokenPayload, process.env.JWT_SECRET, {
  algorithm: "HS256",
});

    let userData = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      email: user.dataValues.email,
      roles: user.dataValues.roles,
    };
   
    const currentTime = new Date();

    const tokenExpiryDate = new Date(
      currentTime.getTime() + tokenExpiration * 1000
    );
    const refreshTokenExpiryDate = new Date(
      currentTime.getTime() + refreshTokenExpiration * 1000
    );

    const formattedCurrentTime = format(currentTime, "yyyy-MM-dd HH:mm:ss");
    const formattedTokenExpiryDate = format(
      tokenExpiryDate,
      "yyyy-MM-dd HH:mm:ss"
    );
    const formattedRefreshTokenExpiryDate = format(
      refreshTokenExpiryDate,
      "yyyy-MM-dd HH:mm:ss"
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      success: true,
      // tokenDeco:decodedToken ,
      token,
      tokenCreationDate: formattedCurrentTime,
      tokenExpiryDate: formattedTokenExpiryDate,
      refreshToken,
      refreshTokenCreationDate: formattedCurrentTime,
      refreshTokenExpiryDate: formattedRefreshTokenExpiryDate,
      userData,
    
    });
  } catch (error) {
    console.error("Error en la autenticaciÃ³n:", error);
  }
};

module.exports = {
  register,
  login,
};
