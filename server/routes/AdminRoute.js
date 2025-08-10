const express = require("express")
const router = express.Router();
const { getAll } = require("../controllers/DataController");

router.get("/all", getAll );

module.exports = router;