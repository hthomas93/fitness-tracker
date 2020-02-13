const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

// Initializes port
const PORT = process.env.PORT || 3030;

// initializes database
const app = express();
const db = require("./models")

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Looks inside the public folder and displays any static files, such as HTML documents
app.use(express.static("public"));

db.Workout.create({ name: "Fitness Tracker" })
    .then(dbWorkout => {
        console.log(dbWorkout);
    }).catch(err => {
        res.json(err);
    })

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

require("./routes/api-routes.js")(app);
require("./routes/html-routes")(app);

// Start the server
app.listen(PORT, () => {
    console.log(`App running on localhost ${PORT}`);
});
