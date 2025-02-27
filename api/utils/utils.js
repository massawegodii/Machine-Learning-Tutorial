const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

// Function to preprocess text
exports.preprocessText = (text) => {
    return tokenizer.tokenize(text.toLowerCase()).join(' ');
};

// Function to compute cosine similarity
exports.cosineSimilarity = (text1, text2) => {
    const tfidf = new TfIdf();
    tfidf.addDocument(text1);
    tfidf.addDocument(text2);
    
    let similarity = 0;
    tfidf.tfidfs(text1, function(i, measure) {
        similarity += measure;
    });

    return similarity;
};