import express from 'express';
import AuthController from '../controllers/authController.js'; // Importa el controlador

const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', AuthController.register);

// Iniciar sesión
router.post('/login', AuthController.login);

// Cerrar sesión
router.post('/logout', AuthController.logout);

// Ruta protegida que requiere autenticación
router.get('/profile', AuthController.verifyToken, async (req, res) => {
    try {
        const { user } = req;
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

export default router;
