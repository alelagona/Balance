import express from "express";
import cors from "cors";
import { getMovements, getChartInfo } from "./controllers/movementsController.js";
import { register, login } from "./controllers/usersController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/movements/:userId/:year/:month", getMovements);
app.get("/chartInfo/:userId/:year/:month", getChartInfo);

app.post("/register", register);
app.post("/login", login);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});