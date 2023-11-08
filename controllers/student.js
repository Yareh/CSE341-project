const mongodb = require("../db/conection");
//const ObjectId = require('mongodb').ObjectId;
const { ObjectId } = require("mongodb");

const getStudents = (req, res) => {
  let courses = [];
  mongodb.getDb().db().collection("students")
    .find()
    .forEach((course) => courses.push(course))
    .then(() => {
      res.status(200).send(courses);
    })
    .catch(() => {
      res.status(500).json({ error: "Course not found" });
    });
};

const getStudentById = (req, res) => {
  mongodb.getDb().db().collection("students")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).send(doc);
       })
       .catch(() => {
        res.status(500).json({ error: "Could not fetch the document by id" });
       });
};
 

const postStudent = (req, res) => {
  
  //const db = getDb();
  const courses = req.body;
  mongodb.getDb().db().collection("students")
  .insertOne(courses)
  .then((result) => {
    res.status(201).json(result);
  })
  .catch((error) => {
    res.status(500).json({ err: "Could not create a new course" });
  });
};

const deleteStudent = (req, res) => {
  const id = new ObjectId(req.params.id);
  mongodb.getDb().db().collection("students")
  .deleteOne({ _id:id })
  .then((result) => {
    res.status(200).send(result);
      })
      .catch(() => {
        res.status(500).json({ error: "Could not delete the course by id" });
      });
  };

  const updateStudent = (req, res) => {
    const id = new ObjectId(req.params.id);
    const courses = req.body;
    mongodb.getDb().db().collection("students")
      .updateOne({ _id:id }, { $set: courses })
      .then((result) => {
        res.status(204).send(result);
      })
      .catch(() => {
        res.status(500).json({ error: "Could not update the course by id" });
      });
  };

module.exports = { 
  getStudents,
  getStudentById,
  postStudent,
  deleteStudent,
  updateStudent
 };
