const express = require("express")
const router = express.Router();
const { getAll, getAllByName } = require("../controllers/DataController");
const protect = require("../middleware/Authorization");

router.get("/all", protect,  getAll );
router.get("/account/:name", protect, getAllByName);

module.exports = router;