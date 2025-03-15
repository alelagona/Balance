const express = require("express");
const cors = require("cors");
const movementsRoutes = require('./routes/movementsRoutes');
const usersRoute = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(movementsRoutes);
app.use(usersRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
