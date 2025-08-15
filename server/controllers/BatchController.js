const express = require("express");
const Batch = require("../models/Batch");

exports.CreateBatch = async (req, res) => {

    try {

        const {
            BatchName, Batch_Mentor, Batch_Students, Batch_Instructor
        } = req.body

        const Batch_Finded = await Batch.findOne({ BatchName })

        if (Batch_Finded)
            return res.status(402).json({ message: "Batch Already exists!" });

        await Batch.create({
            BatchName,
            Batch_Mentor,
            Batch_Students,
            Batch_Instructor
        })

        res.status(200).json({ message: `${BatchName} Created Successfully ...` })

    }
    catch (err) {
        console.log(err)
        res.status(401).json({ message: err.message })
    }

}