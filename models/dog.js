//import mongoose
const mongoose = require('mongoose');

//dog schema
const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    breed: {
        type: String,
        require: true
    },
    age: { 
        type: Number,
        required: true
    }
})

const Dog = mongoose.model('Dog',dogSchema)
module.exports = Dog