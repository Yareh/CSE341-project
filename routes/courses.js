const express = require("express");
const router = express.Router();
//onst security = require('../middleware/authorize.js'); 
const coursesController = require('../controllers/courses.js');
const {requiresAuth} = require('express-openid-connect');
//const { saveCourses } = require("../validator/courses");

// const {
//   getCourses,
//   getCoursesById,
//   postCourses,
//   deleteCourses,
//   updateCourses,
// } = require("../controllers/courses");


router.get('/', coursesController.getCourses);
router.get('/:id', coursesController.getCoursesById);
router.post('/', requiresAuth(), coursesController.postCourses);
router.put('/:id', requiresAuth(), coursesController.updateCourses);
router.delete('/:id', requiresAuth(), coursesController.deleteCourses);

module.exports = router;

// router.get("/", getCourses);
// router.get("/:id", getCoursesById);
// router.post("/", saveCourses, postCourses);
// router.put("/:id",saveCourses, updateCourses);
// router.delete("/:id", deleteCourses);
