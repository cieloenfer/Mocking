const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config/config');

// Controlador para manejar el inicio de sesión
async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por correo electrónico en la base de datos
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generar token JWT
            const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Controlador para manejar el registro de usuarios
async function register(req, res) {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al intentar registrar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = {
    login,
    register
};
