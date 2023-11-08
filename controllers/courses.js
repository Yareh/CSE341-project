const mongodb = require("../db/conection");
const { ObjectId } = require("mongodb");


const getCourses = (req, res) => {
  let courses = [];
  mongodb.getDb().db().collection("courses")
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
  mongodb.getDb().db().collection("courses")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).send(doc);
       })
       .catch(() => {
        res.status(500).json({ error: "Could not fetch the document by id" });
       });
}; 

const postCourses = (req, res) => {
  
  //const db = getDb();
  const courses = req.body;
  mongodb.getDb().db().collection("courses")
  .insertOne(courses)
  .then((result) => {
    res.status(201).json(result);
  })
  .catch((error) => {
    res.status(500).json({ err: "Could not create a new course" });
  });
};

const deleteCourses = (req, res) => {
  const id = new ObjectId(req.params.id);
  mongodb.getDb().db().collection("courses")
  .deleteOne({ _id:id })
  .then((result) => {
    res.status(200).send(result);
      })
      .catch(() => {
        res.status(500).json({ error: "Could not delete the course by id" });
      });
  };

  const updateCourses = (req, res) => {
    const id = new ObjectId(req.params.id);
    const courses = req.body;
    mongodb.getDb().db().collection("courses")
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
