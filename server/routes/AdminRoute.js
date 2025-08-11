const express = require("express")
const router = express.Router();
const { getAll, getAllByName } = require("../controllers/DataController");

router.get("/all", getAll );
router.get("/account/:name", getAllByName);

module.exports = router;