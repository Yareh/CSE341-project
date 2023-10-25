const express = require("express");
const router = express.Router();
const { saveStudent } = require("../validator/courses");
const {
  getStudents,
  getStudentById,
  postStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/student");

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", saveStudent, postStudent);
router.delete("/:id", deleteStudent);
router.put("/:id", saveStudent, updateStudent);
module.exports = router;
