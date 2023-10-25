const express = require("express");
const router = express.Router();
const { saveCourses } = require("../validator/courses");
const {
  getCourses,
  getCoursesById,
  postCourses,
  deleteCourses,
  updateCourses,
} = require("../controllers/courses");

router.get("/", getCourses);
router.get("/:id", getCoursesById);
router.post("/", saveCourses, postCourses);
router.put("/:id",saveCourses, updateCourses);
router.delete("/:id", deleteCourses);
module.exports = router;
