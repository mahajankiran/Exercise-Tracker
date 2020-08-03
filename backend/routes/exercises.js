const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => {
      res.json("Error" + err);
    });
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({ description, username, duration, date });

  newExercise
    .save()
    .then(() => {
      res.json("Exercise added");
    })
    .catch((err) => {
      res.json("Error" + err);
    });
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      res.json(exercise);
    })
    .catch((err) => {
      res.json("Error" + err);
    });
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Exercise deleted");
    })
    .catch((err) => {
      res.json("Error" + err);
    });
});

router
  .route("/update/:id")
  .post((req, res) => {
    Exercise.findById(req.params.id)
      .then((exercise) => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = req.body.duration;
        exercise.date = req.body.date;

        exercise.save()
          .then(() => {
            res.json("Exercise update");
          })
          .catch((err) => {
            res.json("Error" + err);
          });
      })
      .catch((err) => {
        res.json("Error" + err);
      });
  })
  

module.exports = router;
