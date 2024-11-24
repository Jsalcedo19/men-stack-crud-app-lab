//import modules
const dotenv = require('dotenv');
dotenv.config(); // loads the environment variables from .env files
const express = require('express');
const mongoose = require ('mongoose');


const app = express(); //loads express
//connects to mongoDB using the connection string in .env
mongoose.connect(process.env.MONGODB_URI); 
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
//routes 
app.get("/", async (req, res) => {
    res.render("index.ejs");
})


app.listen(3000, () => {
    console.log("listening on port localhost:3000")
});

