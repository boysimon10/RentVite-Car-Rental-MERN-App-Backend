const express = require('express');
require('./config/db');
const app = express();
const userRoutes = require('./routes/user.routes');
const carRoutes = require('./routes/car.routes');
const bookingRoutes = require ('./routes/booking.routes')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dotenv = require('dotenv');
const authMiddleware = require('./middleware/auth.middleware');
dotenv.config({ path: './config/.env' });



const port = process.env.PORT || 3000;


const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));


// Middleware pour analyser les données JSON dans les requêtes
app.use(express.json());

app.use(cookieParser());

//routes
app.use('/user', userRoutes);
app.use('/car', carRoutes);
app.use('/booking', bookingRoutes);

app.get('/authenticated', authMiddleware, (req, res) => {
    res.json({ authenticated: true });
});
  
//server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});