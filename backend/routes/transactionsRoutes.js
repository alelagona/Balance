import express from "express";
import { getTransactions, getChartInfo } from '../controllers/transactionsController.js';

const router = express.Router();

router.get('/getTransactions/:year/:month', getTransactions);
router.get('/getChartInfo/:year/:month', getChartInfo);

export default router;