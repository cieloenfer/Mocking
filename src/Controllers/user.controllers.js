const User = require('../models/user.model');

// Controlador para obtener información de un usuario
async function getUser(req, res) {
    const userId = req.params.id;

    try {
        // Buscar el usuario por ID en la base de datos
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al intentar obtener usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Controlador para actualizar información de un usuario
async function updateUser(req, res) {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        // Actualizar el usuario en la base de datos
        await User.findByIdAndUpdate(userId, updateData);

        return res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error al intentar actualizar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = {
    getUser,
    updateUser
};

