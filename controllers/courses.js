const { getDb } = require("../DB/conection");
const { ObjectId } = require("mongodb");
const getCourses = (req, res) => {
  const db = getDb();
  let courses = [];
  db.collection("courses")
    .find()
    .forEach((course) => courses.push(course))
    .then(() => {
      res.status(200).send(courses);
    })
    .catch(() => {
      res.status(500).json({ error: "Course not found" });
    });
};

const getCoursesById = (req, res) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  db.collection("courses")
  .findOne({ _id:id })
  .then((doc) => {
    res.status(200).send(doc);
  })
  .catch(() => {
    res.status(500).json({ error: "Could not get the course by id" });
  });
};

const postCourses = (req, res) => {
  const db = getDb();
  const courses = req.body;
  db.collection("courses")
  .insertOne(courses)
  .then((result) => {
    res.status(201).json(result);
  })
  .catch((error) => {
    res.status(500).json({ err: "Could not create a new course" });
  });
};

const deleteCourses = (req, res) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  db.collection("courses")
  .deleteOne({ _id:id })
  .then((result) => {
    res.status(200).send(result);
      })
      .catch(() => {
        res.status(500).json({ error: "Could not delete the course by id" });
      });
  };

  const updateCourses = (req, res) => {
    const db = getDb();
    const id = new ObjectId(req.params.id);
    const courses = req.body;
    db.collection("courses")
      .updateOne({ _id:id }, { $set: courses })
      .then((result) => {
        res.status(204).send(result);
      })
      .catch(() => {
        res.status(500).json({ error: "Could not update the course by id" });
      });
  };

module.exports = { getCourses,
    getCoursesById,
    postCourses,
    deleteCourses,
    updateCourses
 };
