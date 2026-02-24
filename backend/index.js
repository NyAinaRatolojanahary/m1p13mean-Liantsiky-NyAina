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
const stageRouter = require('./routes/etageRoute');
const boxRouter = require('./routes/boxRoute');
const shopRouter = require('./routes/boutiqueRoute');
const productRouter = require('./routes/produitRoute');
const etageRouter = require('./routes/etageRoute');

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
app.use('/user', userRouter);
app.use('/uploads', express.static('uploads'));
app.use('/product-category', productCategorieRouter);
app.use('/stage', stageRouter);
app.use('/box', boxRouter);
app.use('/shop', shopRouter);
app.use('/product', productRouter)
app.use('/etage', etageRouter);



app.get('/test/:nbr', authMiddlware,roleMiddlware(ROLES.CLIENT), (req, resp) => {
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
