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
const walletRouter = require('./routes/');
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



app.use('/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/uploads', express.static('uploads'));
app.use('/product-category', productCategorieRouter);
app.use('/stage', stageRouter);
app.use('/box', boxRouter);
app.use('/shop', shopRouter);
app.use('/product', productRouter);
app.use('/buy', buyRouter);
app.use('/wallet', walletRouter);
app.use('/api/product-category', productCategorieRouter);
app.use('/api/box', boxRouter);
app.use('/api/shop', shopRouter);
app.use('/api/product', productRouter);
app.use('/api/etage', etageRouter);
app.use('/api/jeton',jetonRouter);
app.use('/api/modePaiement',modePaiementRouter);


app.get('/test/:nbr', authMiddlware,roleMiddlware(ROLES.CLIENT), (req, resp) => {
    resp.setHeader('Content-Type','text/plain');
    resp.send("Bonjour sur le test : " + req.params.nbr);
});

// Serve Angular static files
app.use(express.static(path.join(__dirname, 'public')));

// Angular routing fallback (SPA support)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404
// app.use((req, resp) => {
//     resp.status(404).send("Page Not Found");
// });

// Start server
app.listen(PORT,'0.0.0.0', () => 
    console.log(`Serveur demarre sur le port ${PORT}`)
);
