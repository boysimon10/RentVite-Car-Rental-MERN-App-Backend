const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Accès non autorisé' });
    }
};

module.exports = authMiddleware;
