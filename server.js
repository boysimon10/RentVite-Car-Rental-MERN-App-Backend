const express = require('express');
require('./config/db');
const app = express();
const userRoutes = require('./routes/user.routes');

const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const port = process.env.PORT || 3000;

// Middleware pour analyser les données JSON dans les requêtes
app.use(express.json());

//routes
app.use('/user', userRoutes);

//server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
