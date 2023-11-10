const express = require("express");
const router = express.Router();
const security = require('../middleware/authorize.js'); 
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
router.post('/', requiresAuth(), security.checkLogin, coursesController.postCourses);
router.put('/:id', security.checkLogin, coursesController.updateCourses);
router.delete('/:id', security.checkLogin, coursesController.deleteCourses);

module.exports = router;

// router.get("/", getCourses);
// router.get("/:id", getCoursesById);
// router.post("/", saveCourses, postCourses);
// router.put("/:id",saveCourses, updateCourses);
// router.delete("/:id", deleteCourses);
