const { createServer } = require('node:http');
const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const connectDatabase = require('./config/database')
const router = express.Router()

const annoncesRouter = require("./routes/annonces");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

app.use("/Annonce", annoncesRouter);

connectDatabase();

const server = createServer(app);

app.use("/", require("./routes/annonces"));


server.listen(port,  () => {
    console.log(`Serveur en cours d'exécution sur ${port}`);
});

module.exports = app;