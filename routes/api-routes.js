const db = require("../models");

// Sets the routes page up to be exported
module.exports = function (app) {
    // Gets all of the entries from the api/workouts route, then displays the workouts
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({}).then(function (dbWorkout) {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        })
    })

    app.get("/api/workouts/range", function (req, res) {
        db.Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout)
        })
            .catch(err => {
                res.json(err)
            })
    })

    // Gets the workout whose id matches the parameter in the route path
    app.get("/api/workouts/:id", function (req, res) {
        db.Workout.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbWorkout) {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        })
    })

    app.post("/api/workouts", function (req, res) {
        db.Workout.create(req.body).then(function (dbWorkout) {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        })
    })

    app.put("/api/workouts/:id", function (req, res) {
        var query = { _id: req.params.id };
        db.Workout.findOneAndUpdate(query, {
            $push: { exercises: [req.body] }
        }, function (err, dbWorkout) {
            if (err) {
                res.json(err);
            } else {
                res.json(dbWorkout);
            }
        })
    })
}
