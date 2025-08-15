const user = require("../models/User")

exports.getAll = async (req, res) => {
    const Users = await user.find();

    try {
        if (Users)
            return res.status(200).json(Users);
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server Down" })
    }

}

exports.getAllByName = async (req, res) => {

    const { name } = req.params;

    try {
        const UserName = await user.findOne({ firstName: name })

        if (UserName)
            return res.status(200).json(UserName)
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server Down" })
    }

}