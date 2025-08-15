const express = require("express")
const router = express.Router();
const { getAll } = require("../controllers/DataController");
const protect = require("../middleware/Authorization");

router.get("/all", protect,  getAll );

module.exports = router;