const express = require("express");
const router = express.Router();

const { CreateBatch } = require("../controllers/BatchController");

router.post("/Create-Batch", CreateBatch);

module.exports = router;