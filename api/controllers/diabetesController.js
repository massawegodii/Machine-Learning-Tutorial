const fs = require("fs");
const path = require("path");

const modelPath = path.join(__dirname, "../models/diabetes_model.json");
const foodPath = path.join(__dirname, "../models/food_recommendations.json");

let model = null;
let foodRecommendations = null;

fs.readFile(modelPath, "utf8", (err, data) => {
    if (err) console.error("Error loading model:", err);
    else model = JSON.parse(data);
});

fs.readFile(foodPath, "utf8", (err, data) => {
    if (err) console.error("Error loading food data:", err);
    else foodRecommendations = JSON.parse(data);
});

const predictDiabetes = (inputData) => {
    if (!model) return "Model not loaded";
    const standardizedInput = inputData.map((val, index) =>
        (val - model.scaler_mean[index]) / Math.sqrt(model.scaler_var[index])
    );
    let predictionScore = model.intercept[0];
    for (let i = 0; i < standardizedInput.length; i++) {
        predictionScore += standardizedInput[i] * model.coef[0][i];
    }
    return predictionScore >= 0 ? "Diabetic" : "Non-Diabetic";
};

exports.getRecommendation = (req, res) => {
    try {
        const inputData = req.body.input;
        if (!inputData || inputData.length !== 8) {
            return res.status(400).json({ error: "Invalid input. Provide 8 numeric values." });
        }
        const status = predictDiabetes(inputData);
        const recommendedFoods = foodRecommendations[status] || [];
        res.json({ prediction: status, recommendations: recommendedFoods });
    } catch (error) {
        res.status(500).json({ error: "Error processing request" });
    }
};