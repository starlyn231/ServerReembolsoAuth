// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authenticateToken = require("../middlewares/validate-token");
const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  try {
    const { email, Password, notificationsWithEmail, rol } = req.body;
    //let userName = email;
    console.log(email, Password, notificationsWithEmail, rol);
    if (!email || !Password) {
      return res.status(400).json({
        msg: "Por favor, rellena los campos requeridos",
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
});

// POST api/v1/login | public | login exixting user
router.post("/login", async (req, res, next) => {
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
  


   const token = jwt.sign(
      { userId: user.dataValues.Id },
     process.env.JWT_SECRET,
    { expiresIn: "50s" }
     );
   
     const refreshToken = jwt.sign(
      { userId: user.dataValues.Id },
     process.env.JWT_SECRET,
    { expiresIn: "1d" }
     );
   
    let userData = {
      Id: user.dataValues.Id,
      Username: user.dataValues.Username,
      Email: user.dataValues.Email,
      Rol: user.dataValues.Rol,
    };
    res.status(200).json({
      msg: "Inicio de sesión exitoso",
      success: true,
      token,
      refreshToken,
      data: userData,
    });
  } catch (error) {
    console.error("Error en la autenticación:", error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
});


router.get('/test', authenticateToken, (req, res) => {
  // Ahora tienes acceso a req.user gracias al middleware authenticateToken
  // Puedes usar esta información para filtrar los datos que envías de vuelta

  // Supongamos que clients es un array con tus datos de clientes


  res.json('heello word');
});
router.get('/clients', authenticateToken, (req, res) => {
  // Ahora tienes acceso a req.user gracias al middleware authenticateToken
  // Puedes usar esta información para filtrar los datos que envías de vuelta

  // Supongamos que clients es un array con tus datos de clientes

  const clients = [
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
    { id: 3, name: 'Cliente 3' },
  ];
  res.json(clients);
});
module.exports = router;
