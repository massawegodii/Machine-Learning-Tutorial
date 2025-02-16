const express = require("express");
const bodyParser = require("body-parser");
const diabetesRoutes = require("./routes/diabetesRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api", diabetesRoutes);

app.listen(port, () => {
    console.log(` Diabetes Prediction API running at http://localhost:${port}`);
});