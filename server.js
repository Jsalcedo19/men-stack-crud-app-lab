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

  //import Dog model
  const Dog = require('./models/dog.js');

//middleware
//allows additiona functionality
  app.use(express.urlencoded({ extended: false }));


//GET routes homePage
app.get("/", async (req, res) => {
    res.render("index.ejs");
})
 //GET route displays for to create a new dog
app.get("/dogs/new", (req, res) => {
    res.render("dogs/new.ejs");
});


// POST routes 
app.post("/dogs", async (req, res) => {
    console.log(req.body);
    await Dog.create(req.body);
    res.redirect("/Dogs/new");
  });
  

app.listen(3000, () => {
    console.log("listening on port localhost:3000")
});

