const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT|| 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=> console.log("Mongo Connected"))
    .catch(err => console.log(err));


app.get('/',function(req,resp) {
    console.log("Hello World");
    resp.send("Hello World");
}).get('/test/:nbr/',function (req,resp) {
    resp.setHeader('Content-Type','text/plain');
    console.log(req.params.nbr);
    resp.send("Bonjour sur le test :"+ req.params.nbr);
}).use(function(req, resp) {
    resp.setHeader('Content-Type','text/plain');
    resp.status(404).send("Page Not Found")
});

app.listen(PORT,()=> console.log(`Serveur demarre sur le port ${PORT}`));