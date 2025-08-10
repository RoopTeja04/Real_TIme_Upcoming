const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "mentor", "instructor", "user"],
        default: "user"
    }
}, { timestamps: true })

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password"))
        return next();

    const Hack = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, Hack)
    next();

})

module.exports = mongoose.model("user", UserSchema);