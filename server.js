// Requires express to set up the server
const express = require("express");
// Requires mongoose to connect to the database
const mongoose = require("mongoose");
// Requires logger
const logger = require("morgan");



// Initializes port
const PORT = process.env.PORT || 8080;

// initializes database
const app = express();
const db = require("./models/index")

app.use(logger("dev"));

// Tells the server what kind of data to use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Looks inside the public folder and displays any static files, such as HTML documents
app.use(express.static("public"));

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


// Creates 
db.Workout.create({ name: "Fitness Tracker" })
    .then(dbWorkout => {
        console.log(dbWorkout);
    }).catch(err => {
        res.json(err);
    })

require("./routes/api-routes.js")(app);
require("./routes/html-routes")(app);

// Start the server
app.listen(PORT, () => {
    console.log(`App running on localhost ${PORT}`);
});
