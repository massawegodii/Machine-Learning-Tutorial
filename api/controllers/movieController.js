const { getMovies, getMovieByTitle } = require("../models/movieModel");
const { cosineSimilarity, preprocessText } = require("../utils/utils");
const stringSimilarity = require("string-similarity");

// Recommend movies based on the given favorite movie
exports.getRecommendations = (req, res) => {
  const { favoriteMovie } = req.body;
  if (!favoriteMovie) {
    return res
      .status(400)
      .json({ error: "Please provide a favorite movie name" });
  }

  const movieTitles = getMovies().map((m) => m.title);
  const bestMatch = stringSimilarity.findBestMatch(favoriteMovie, movieTitles)
    .bestMatch.target;
  const movie = getMovieByTitle(bestMatch);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // Compute similarity with other movies
  const recommendations = getMovies().map((m) => ({
    title: m.title,
    similarity: cosineSimilarity(
      preprocessText(movie.combined_features),
      preprocessText(m.combined_features)
    ),
  }));

  // Sort by similarity and return top 10
  recommendations.sort((a, b) => b.similarity - a.similarity);
  const topRecommendations = recommendations.slice(1, 10);

  res.json({ recommendedMovies: topRecommendations });
};
