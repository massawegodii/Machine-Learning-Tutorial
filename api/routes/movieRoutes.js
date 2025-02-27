const express = require('express');
const { getRecommendations } = require('../controllers/movieController');

const router = express.Router();

// Define the recommendation route
router.post('/recommend', getRecommendations);

module.exports = router;
