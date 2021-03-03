require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const recipesRouter = require('./routes/recipes');
app.use('/recipes', recipesRouter);

app.listen(3000, () => console.log("Server started"));

