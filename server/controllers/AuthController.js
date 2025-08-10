const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt_Token = require("jsonwebtoken")


const GenerateJson_WebToken = (id) => {
    return jwt_Token.sign(
        { id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_Expires_In || "2h" }
    )
}

exports.CreateAccount = async (req, res) => {

    const {
        firstName,
        lastName,
        emailID,
        password,
        role
    } = req.body

    try {

        const UserData = await User.findOne({ emailID })

        if (UserData)
            return res.status(400).json({ message: "User Already Exist!" });

        await User.create({
            firstName,
            lastName,
            emailID,
            password,
            role
        })

        return res.status(200).json({
            message: `${firstName} is Registered Successfully with E-Mail ID: ${emailID}, with JSON Web_Token: ${GenerateJson_WebToken(User._id)}`
        })

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Down" })
    }

}

exports.Login = async (req, res) => {

    const { emailID, password } = req.body;

    try {
        const UserData = await User.findOne({ emailID })

        if (!UserData)
            return res.status(401).json({ message: "Invalid Email" })

        const isMatchedPassword = await bcrypt.compare(password, UserData.password)

        if (!isMatchedPassword)
            return res.status(404).json({ message: "Incorrect Password" })

        return res.status(201).json({
            firstName: UserData.firstName,
            role: UserData.role,
            token: GenerateJson_WebToken(UserData._id)
        })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server Down" })
    }

}

exports.UpdatePassword = async (req, res) => {

    const { emailID, password } = req.body;

    try {
        const verifyUser = await User.findOne({ emailID });

        if (!verifyUser)
            return res.status(401).json({ message: "Invalid Email" })

        verifyUser.password = password
        await verifyUser.save();

        return res.status(200).json({ message: "Changed Successfully" })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Down" })
    }

}