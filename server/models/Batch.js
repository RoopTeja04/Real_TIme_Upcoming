const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({

    BatchName: {
        type: String,
        required: true
    },

    Batch_Count: {
        type: Number,
        default: 0
    },

    Batch_Mentor: {
        type: String,
        required: true
    },

    Batch_Students: {
        type: [String],
        validate: {
            validator: function (students) {
                return students.length <= 25;
            },
            message: "A batch cannot have more than 25 students"
        }
    },

    Batch_Instructor: {
        type: String,
        required: true
    }
})

BatchSchema.pre("save", function (next) {
    this.Batch_Count = this.Batch_Students.length;
    next();
});

module.exports = mongoose.model("Batch", BatchSchema);