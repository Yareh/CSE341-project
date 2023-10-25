const { getDb } = require("../DB/conection");
const { ObjectId } = require("mongodb");
const getStudents = (req, res) => {
  const db = getDb();
  let students = [];
  db.collection("students")
    .find()
    .forEach((student) => students.push(student))
    .then(() => {
      res.status(200).send(students);
    })
    .catch(() => {
      res.status(500).json({ error: "Student not found" });
    });
};

const getStudentById = (req, res) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  db.collection("students")
    .findOne({ _id: id })
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not get student by id" });
    });
};

const postStudent = (req, res) => {
  const db = getDb();
  const student = req.body;
  db.collection("students")
    .insertOne(student)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json({ err: "Could not create a new student" });
    });
};

const deleteStudent = (req, res) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  db.collection("students")
    .deleteOne({ _id: id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not delete the student by id" });
    });
};

const updateStudent = (req, res) => {
  const db = getDb();
  const id = new ObjectId(req.params.id);
  const student = req.body;
  db.collection("students")
    .updateOne({ _id: id }, { $set: student })
    .then((result) => {
      res.status(204).send(result);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not update the student by id" });
    });
};

module.exports = {
  getStudents,
  getStudentById,
  postStudent,
  deleteStudent,
  updateStudent,
};
