// Requires express to set up the server
const express = require("express");
// Requires mongoose to connect to the database
const mongoose = require("mongoose");
// Requires logger
const logger = require("morgan");



// Initializes port
const PORT = process.env.PORT || 3030;

// initializes database
const app = express();
const db = require("./models")

app.use(logger("dev"));

// Tells the server what kind of data to use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Looks inside the public folder and displays any static files, such as HTML documents
app.use(express.static("public"));

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
