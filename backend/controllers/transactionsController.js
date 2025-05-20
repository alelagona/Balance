import { getTransactionsService, getChartInfoService } from "../services/transactionsService.js";

export const getTransactions = async (req, res) => {
	if (!req.session.user) {
		res.status(401).send("Not logged in");
		return;
	}

	const { year, month } = req.params;

	try {
		const result = await getTransactionsService(req.session.user.id, year, month);
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

export const getChartInfo = async (req, res) => {
	if (!req.session.user) {
		res.status(401).send("Not logged in");
		return;
	}

	const { year, month } = req.params;

	try {
		const result = await getChartInfoService(req.session.user.id, year, month);
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};
