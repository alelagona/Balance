const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post("/api/register", usersController.register);

module.exports = router;