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
