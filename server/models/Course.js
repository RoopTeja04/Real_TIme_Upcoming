const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    course_Name: {
        type: String,
        required: true
    },
    course_StartDate: {
        type: Date,
        required: true
    },
    course_EndDate: {
        type: Date,
        required: true
    },
    course_Description: {
        type: String,
        required: true
    },

    video: [
        {
            title: { type: String, required: true },
            url: { type: String, required: true },
            duration: { type: Number },
            description: { type: String }
        }
    ],

    syllabus: [
        {
            moduleTitle: { type: String, required: true },
            moduleDescription: { type: String },
            lessons: [
                {
                    lessonTitle: { type: String, required: true },
                    lessonContent: { type: String },
                    videoUrl: { type: String }, 
                    duration: { type: Number },
                    resources: [{ type: String }] 
                }
            ]
        }
    ]

})

module.exports = mongoose.model("Course", CourseSchema);