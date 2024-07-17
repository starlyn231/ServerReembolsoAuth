const User = require("../models/user");
const getUserInfo = async (req, res) => {
    try {
      const { id } = req.params;
  console.log('id:',id)
      if (!id) {
        return res.status(400).json({
          message: "Por favor, proporcione un id",
          success: false,
        });
      }
      let user;
      if (id) {
        user = await User.findOne({
          where: { id },
        });
    }
    console.log(user)
  
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado",
          success: false,
        });
      }
  
      res.status(200).json({
        message: "Información del usuario obtenida exitosamente",
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };


  const getAllUserInfo = async (req, res) => {
    try {
      let users;
      users = await User.findAll({})
      res.status(200).json({
        message: "Información del usuario obtenida exitosamente",
        success: true,
        users
        
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { getUserInfo,getAllUserInfo };