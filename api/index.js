const express = require("express");
const bodyParser = require("body-parser");
const diabetesRoutes = require("./routes/diabetesRoutes");
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use("/api", diabetesRoutes);
app.use('/api/movies', movieRoutes);


app.listen(port, () => {
    console.log(` Diabetes Prediction API running at http://localhost:${port}`);
});