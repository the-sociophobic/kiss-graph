const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const app = express()


app.use(cors())


app.use(express.static(path.join(__dirname, 'build')))

// app.get('/libs/starukha/index.js', (req, res) =>
//   res.sendFile(path.join(__dirname, 'libs/starukha', 'index.js')))
// app.get('/libs/starukha/index.css', (req, res) =>
//   res.sendFile(path.join(__dirname, 'libs/starukha', 'index.css')))
// app.get('/libs/starukha/icon.png', (req, res) =>
//   res.sendFile(path.join(__dirname, 'libs/starukha', 'icon.png')))
// app.get('/libs/starukha/font', (req, res) =>
//   res.sendFile(path.join(__dirname, 'libs/starukha', 'bodoni.ttf')))

// app.get('/libs/recycle-polytech/index.js', (req, res) =>
//   res.sendFile(path.join(__dirname, 'libs/recycle-polytech', 'index.js')))
// app.get('/libs/recycle-polytech/index.css', (req, res) =>
//   res.sendFile(path.join(__dirname, 'libs/recycle-polytech', 'index.css')))
// app.get('/libs/recycle-polytech/icon.png', (req, res) =>
//   res.sendFile(path.join(__dirname, 'libs/recycle-polytech', 'icon.png')))


// app.use('/ar', express.static('libs/ar'))
// app.use('/nebdt', express.static('libs/nebdt'))
// app.use('/boom-fest', express.static('libs/boom-fest'))


app.get('/data/nodes', async (req, res) => {
  const filePath = path.join(__dirname, 'src/libs/engines/data/hardcoded/DB', 'testt.json')

  // res.sendFile("http://cdn.tochkadostupa.spb.ru/the_sociophobic/kiss-graph.com/data/testt.json"))
  res.send(JSON.parse(fs.readFileSync(filePath, 'utf8')))
})
app.get('/data/position', async (req, res) => {
  const filePath = path.join(__dirname, 'src/libs/engines/data/hardcoded/DB', 'position.json')

  // res.sendFile("http://cdn.tochkadostupa.spb.ru/the_sociophobic/kiss-graph.com/data/position.json"))
  res.send(JSON.parse(fs.readFileSync(filePath, 'utf8')))
})
app.get('/data/uv', async (req, res) => {
  const filePath = path.join(__dirname, 'src/libs/engines/data/hardcoded/DB', 'uv.json')

  // res.sendFile("http://cdn.tochkadostupa.spb.ru/the_sociophobic/kiss-graph.com/data/uv.json"))
  res.send(JSON.parse(fs.readFileSync(filePath, 'utf8')))
})

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.listen(3005)