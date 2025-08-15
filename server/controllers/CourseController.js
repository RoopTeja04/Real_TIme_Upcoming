const course = require("../models/Course");

exports.CreateCourse = async (req, res) => {

    try {
        const {
            course_Name,
            course_StartDate,
            course_EndDate,
            course_Description,
            video,
            syllabus
        } = req.body

        const newCourse = new course({
            course_Name,
            course_StartDate,
            course_EndDate,
            course_Description,
            video,
            syllabus
        })

        await newCourse.save();

        res.status(201).json({
            message: "Course Saved Successfully..."
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message })
    }
}