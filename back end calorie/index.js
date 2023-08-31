const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(express.json());
const mongo = require("./src/db/connec");
const userRoute = require("./src/routes/userRoutes");
const foodRoute = require("./src/routes/foodRoutes");
const user = require("./src/routes/foodcsvRoutes");
const activityroute = require("./src/routes/activityRoute");
const useractivity = require("./src/routes/activitycsvRoute");

app.use(cors());
app.use("/user", userRoute);
app.use("/food", foodRoute);
app.use("/importuser", user);
app.use("/activity", activityroute);
app.use("/ipactivity", useractivity);

app.listen(PORT, () => {
  console.log(`connection is listening on port no.${PORT} `);
});
