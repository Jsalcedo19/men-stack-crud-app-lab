//import modules
const dotenv = require('dotenv');
dotenv.config(); // loads the environment variables from .env files
const express = require('express');
const mongoose = require ('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan"); 

//loads express
const app = express(); 

//connects to mongoDB using the connection string in .env
mongoose.connect(process.env.MONGODB_URI); 
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  //import Dog model
  const Dog = require('./models/dog.js');

//MIDDLEWARE
//allows additiona functionality
  app.use(express.urlencoded({ extended: false }));
  app.use(methodOverride("_method"));
  app.use(morgan("dev")); 
  const bodyParser = require("body-parser"); // modified by chatGPT
app.use(bodyParser.urlencoded({ extended: true })); // modified by chatGPT


//GET routes homePage
app.get("/", async (req, res) => {
    res.render("index.ejs");
})
 //GET route displays for to create a new dog
app.get("/dogs/new", (req, res) => {
    res.render("dogs/new.ejs");
});


// POST routes for creating a new dog
app.post("/dogs", async (req, res) => {
    console.log(req.body);
    await Dog.create(req.body);
    res.redirect("/Dogs/new");
  });
 
// GET route displays all dogs in the collection
app.get("/dogs", async (req, res) => {
    const allDogs = await Dog.find();
    res.render("dogs/index.ejs",{dogs:allDogs});
});
// GET route displays the dog by id and its properties are displayed
app.get("/dogs/:dogId", async(req, res) => {
    const foundDog = await Dog.findById(req.params.dogId);
    res.render("dogs/show.ejs", {dog: foundDog});
  });
  
  //DELETE route deletes dog by Id
  app.delete("/dogs/:dogId", async(req, res) => {
    await Dog.findByIdAndDelete(req.params.dogId);
    res.redirect("/dogs");
  });

  app.get("/dogs/:dogId/edit", async (req, res) => {
    const foundDog = await Dog.findById(req.params.dogId);
    res.render("dogs/edit.ejs", {
        dog:foundDog,
    });
  });
  
  app.put("/dogs/:dogId", async (req, res) => {
    // Validate input data
    const { name, breed, age } = req.body;
    if (!name && !breed && !age) {
      return res.status(400).send("No valid fields provided for update.");
    }
  
    // Extract only the fields that should be updated
    const updateFields = {};
    if (name) updateFields.name = name;
    if (breed) updateFields.breed = breed;
    if (age) updateFields.age = age;
  
    // Update the dog in the database
    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.dogId,
      { $set: updateFields }, // Use $set to ensure only specific fields are updated
      { new: true, runValidators: true } // Ensures the returned document is the updated one and runs validators
    );
  
    if (updatedDog) {
      // Send a response to indicate successful update
      res.send("Dog updated successfully");
    } else {
      // Handle case where the dog is not found
      res.status(404).send("Dog not found");
    }
  });
  
  
  
  

app.listen(3000, () => {
    console.log("listening on port localhost:3000")
});

