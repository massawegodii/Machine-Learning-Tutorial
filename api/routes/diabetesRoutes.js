const express = require("express");
const router = express.Router();
const diabetesController = require("../controllers/diabetesController");

router.post("/predict", diabetesController.getRecommendation);

module.exports = router;