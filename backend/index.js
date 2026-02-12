const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authMiddlware = require('./middlewares/authMiddleware');
const roleMiddlware = require('./middlewares/roleMiddleware');

const authRouter = require('./routes/authRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion DB
connectDB();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, resp) => {
    resp.send("Hello World");
});

app.use('/auth', authRouter);

app.get('/test/:nbr', authMiddlware,roleMiddlware(10), (req, resp) => {
    resp.setHeader('Content-Type','text/plain');
    resp.send("Bonjour sur le test : " + req.params.nbr);
});

// 404
app.use((req, resp) => {
    resp.status(404).send("Page Not Found");
});

// Start server
app.listen(PORT, () => 
    console.log(`Serveur demarre sur le port ${PORT}`)
);
