const express = require("express")
const router = express.Router();
const { CreateAccount, Login, UpdatePassword } = require("../controllers/AuthController");
const protect = require("../middleware/Authorization");

router.post("/create-account", CreateAccount)
router.post("/login", Login)
router.post("/update-password", UpdatePassword);

module.exports = router;