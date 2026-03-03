const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authMiddlware = require('./middlewares/authMiddleware');
const roleMiddlware = require('./middlewares/roleMiddleware');

const ROLES = require('./constants/roles');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/UtilisateurRoute');
const productCategorieRouter = require('./routes/categorieProduitRoute');
const boxRouter = require('./routes/boxRoute');
const shopRouter = require('./routes/boutiqueRoute');
const productRouter = require('./routes/produitRoute');
const etageRouter = require('./routes/etageRoute');
const buyRouter = require('./routes/achatRoute');
const walletRouter = require('./routes/portefeuille');
const jetonRouter = require('./routes/jetonRoute');
const modePaiementRouter = require('./routes/modePaiementRoute');

//deploiement
const path = require('path');

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
// app.get('/', (req, resp) => {
//     resp.send("Hello World");
// });

// app.get('/test', (req, resp) => {
//     resp.send("Hello World test");
// });



app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/uploads', express.static('uploads'));
app.use('/api/product-category', productCategorieRouter);
app.use('/api/etage', etageRouter);
app.use('/api/box', boxRouter);
app.use('/api/shop', shopRouter);
app.use('/api/product', productRouter);
app.use('/api/buy', buyRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/jeton', jetonRouter);
app.use('/api/modePaiement', modePaiementRouter);


app.get('/test/:nbr', authMiddlware, roleMiddlware(ROLES.CLIENT), (req, resp) => {
    resp.setHeader('Content-Type', 'text/plain');
    resp.send("Bonjour sur le test : " + req.params.nbr);
});

// Serve Angular static files
const publicPath = path.join(__dirname, 'public');
if (require('fs').existsSync(publicPath)) {
    app.use(express.static(publicPath));
}

// Angular routing fallback (SPA support)
app.use((req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    if (require('fs').existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(200).json({
            message: "Backend is running. (Frontend build not found in public/)",
            env: process.env.NODE_ENV
        });
    }
});

// 404
// app.use((req, resp) => {
//     resp.status(404).send("Page Not Found");
// });

// Start server
app.listen(PORT, '0.0.0.0', () =>
    console.log(`Serveur demarre sur le port ${PORT}`)
);
