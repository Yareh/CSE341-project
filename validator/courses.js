const { validator } = require("../utils/uValidate");

const saveCourses = (req, res, next) => {
  const validationRule = {
    code: "required|string",
    name: "required|string",
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
    email: "required|string",
    class: "required|string",
    city: "required|string",
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
