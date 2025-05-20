import express from "express";
import cors from "cors";
import session from "express-session";
import transactionsRoutes from "./routes/transactionsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(
	session({
		secret: "password",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60000 * 60,
		},
	})
);

app.use("/transactions", transactionsRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
