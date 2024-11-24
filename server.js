//import modules
const express = require('express');
const app = express();





// get routes 
app.get("/", async (req, res) => {
    res.render("index.ejs");
})


app.listen(3000, () => {
    console.log("listening on localhost: port 3000")
});

