const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Ruta para obtener información de un usuario por su ID
router.get('/:id', userController.getUser);

// Ruta para actualizar información de un usuario por su ID
router.put('/:id', userController.updateUser);

module.exports = router;
