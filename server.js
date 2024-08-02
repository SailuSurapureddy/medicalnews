const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let likeData = { count: 0, liked: false, saved: false };

// Load like data from a file
const loadLikeData = () => {
    if (fs.existsSync('likeData.json')) {
        const rawData = fs.readFileSync('likeData.json');
        likeData = JSON.parse(rawData);
    }
};

// Save like data to a file
const saveLikeData = () => {
    fs.writeFileSync('likeData.json', JSON.stringify(likeData));
};

// Initialize data
loadLikeData();

app.get('/like-data', (req, res) => {
    res.json(likeData);
});

app.post('/like', (req, res) => {
    likeData.count += 1;
    likeData.liked = true;
    saveLikeData();
    res.json(likeData);
});

app.post('/unlike', (req, res) => {
    if (likeData.count > 0) {
        likeData.count -= 1;
    }
    likeData.liked = false;
    saveLikeData();
    res.json(likeData);
});

app.post('/save', (req, res) => {
    likeData.saved = true;
    saveLikeData();
    res.json(likeData);
});

app.post('/unsave', (req, res) => {
    likeData.saved = false;
    saveLikeData();
    res.json(likeData);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}/`);
});
