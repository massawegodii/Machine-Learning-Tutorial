const fs = require('fs');
const path = require('path');

// Load movies data from JSON file
const moviesFilePath = path.join(__dirname, 'movies_data.json');
const moviesData = JSON.parse(fs.readFileSync(moviesFilePath, 'utf-8'));

module.exports = {
    getMovies: () => moviesData,
    getMovieByTitle: (title) => moviesData.find(m => m.title.toLowerCase() === title.toLowerCase())
};


moviesData.forEach(movie => {
    if (!movie.combined_features || movie.combined_features.trim() === '') {
        movie.combined_features = 'unknown';
    }
});
