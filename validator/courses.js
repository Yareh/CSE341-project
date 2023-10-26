const { validator } = require("../utils/uValidate");

const saveCourses = (req, res, next) => {
  const validationRule = {
    course: "required|string",
    courseName: "required|string",
    tutor: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const saveStudent = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    country: "required|string",
    city: "required|string",
    email: "required|string",
    age: "required|number",
    class: "required|string",
    phone: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};


module.exports = {
  saveCourses,
  saveStudent
};
