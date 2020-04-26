const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/libs/starukha/index.js', (req, res) =>
  res.sendFile(path.join(__dirname, 'libs/starukha', 'index.js')))
app.get('/libs/starukha/index.css', (req, res) =>
  res.sendFile(path.join(__dirname, 'libs/starukha', 'index.css')))
app.get('/libs/starukha/icon.png', (req, res) =>
  res.sendFile(path.join(__dirname, 'libs/starukha', 'icon.png')))

app.get('/libs/recycle-polytech/index.js', (req, res) =>
  res.sendFile(path.join(__dirname, 'libs/recycle-polytech', 'index.js')))
app.get('/libs/recycle-polytech/index.css', (req, res) =>
  res.sendFile(path.join(__dirname, 'libs/recycle-polytech', 'index.css')))
app.get('/libs/recycle-polytech/icon.png', (req, res) =>
  res.sendFile(path.join(__dirname, 'libs/recycle-polytech', 'icon.png')))

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.listen(3005)