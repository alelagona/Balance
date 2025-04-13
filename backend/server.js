import express from "express";
import cors from "cors";
import session from "express-session";
import {
	getMovements,
	getChartInfo,
} from "./controllers/movementsController.js";
import { register, login } from "./controllers/usersController.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
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

app.get("/movements/:year/:month", getMovements);
app.get("/chartInfo/:year/:month", getChartInfo);

app.post("/register", register);
app.post("/login", login);

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
