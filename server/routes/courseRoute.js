const express = require("express");
const router = express.Router();

const { CreateCourse } = require("../controllers/CourseController");

router.post("/create-course", CreateCourse);

module.exports = router;