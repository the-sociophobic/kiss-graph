const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/libs/starukha.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'libs', 'index.js'));
});
app.get('/libs/starukha.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'libs', 'index.css'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3005)