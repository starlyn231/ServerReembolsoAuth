// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const verifyPassword = (password, storedHash) => {
  const parts = storedHash.split("$");
  if (parts.length !== 3) {
    throw new Error("Formato de hash no soportado");
  }

  const version = parts[0];
  const salt = parts[1];
  const hash = parts[2];

  if (version !== "v=1") {
    throw new Error("Versión de hash no soportada");
  }

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      Buffer.from(salt, "base64"),
      10000,
      32,
      "sha256",
      (err, derivedKey) => {
        if (err) {
          return reject(err);
        }
        resolve(hash === derivedKey.toString("base64"));
      }
    );
  });
};
// POST api/v1/login | public | login exixting user
router.post("/login", async (req, res, next) => {
  console.log("req ", req.body);
  try {
    const { Email, PasswordHash } = req.body;

    if (!Email || !PasswordHash) {
      console.log("Faltan email o contraseña");
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    const user = await User.findOne({ where: { Email } });
    console.log(user.dataValues.PasswordHash);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log("Usuario encontrado:", user.dataValues);
    // const isMatch = await verifyPassword(PasswordHash, user.dataValues.PasswordHash);
    // const isMatch = await bcrypt.compare(PasswordHash, user.dataValues.PasswordHash);
    // if (!isMatch) {
    //   return res.status(401).json({ message: 'Contraseña incorrecta' });
    // }
    console.log("Contraseña correcta, generando token");
    //   const token = jwt.sign({ userId:  user.dataValues.Id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      msg: "Usuario correcto",
      success: true,
      //token
    });
  } catch (error) {
    console.error("Error en la autenticación:", error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
});

module.exports = router;
