const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé - Token non trouvé' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Erreur dans le middleware d\'authentification :', err);
        res.status(401).json({ error: 'Accès non autorisé - Token invalide' });
    }
};

module.exports = authMiddleware;