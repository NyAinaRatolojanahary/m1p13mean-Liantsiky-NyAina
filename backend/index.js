const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authMiddlware = require('./middlewares/authMiddleware');
const roleMiddlware = require('./middlewares/roleMiddleware');

const ROLES = require('./constants/roles');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/UtilisateurRoute');
const etageRouter = require('./routes/etageRoute');
const boxRouter = require('./routes/boxRoute');

const app = express();
const PORT = process.env.PORT || 3000;
const frontEndOrigin = [
    "http://0.0.0.0:4200",
    "http://localhost:4200",
    "http://127.0.0.1:4200"
];

const corpsOptions = {
    origin: frontEndOrigin,
    optionsSuccessStatus: 200
};
// Connexion DB
connectDB();



// Middlewares globaux
app.use(cors(corpsOptions));
app.use(express.json());

// Routes
app.get('/', (req, resp) => {
    resp.send("Hello World");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/etage', etageRouter);
app.use('/api/box', boxRouter);



app.get('/test/:nbr', authMiddlware,roleMiddlware(ROLES.CLIENT), (req, resp) => {
    resp.setHeader('Content-Type','text/plain');
    resp.send("Bonjour sur le test : " + req.params.nbr);
});

// 404
app.use((req, resp) => {
    resp.status(404).send("Page Not Found");
});

// Start server
app.listen(PORT,'0.0.0.0', () => 
    console.log(`Serveur demarre sur le port ${PORT}`)
);
