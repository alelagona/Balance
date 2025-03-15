const express = require("express");
const router = express.Router();
const movementsController = require('../controllers/movementsController')

router.get("/api/movements/:userId/:year/:month", movementsController.getMonthlyMovements);
router.get("/api/catExpenses/:userId/:year/:month", movementsController.getCatExpenses);

module.exports = router;