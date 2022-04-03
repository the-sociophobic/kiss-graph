import express from 'express'
import path from 'path'
import cors from 'cors'
import fs from 'fs'

import Session, { SessionResType } from '../bot/models/Session'
import Person, { PersonResType } from '../bot/models/Person'
import parseDeviceInfo from './utils/parseDeviceInfo'


const app = express()

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3005',
    'http://localhost:3006',
    'https://kiss-graph.com',
  ]
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, '../../../client/build')))

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
  const filePath = path.join(__dirname, '../../../client/src/libs/engines/data/hardcoded/DB', 'testt.json')

  // res.sendFile("http://cdn.tochkadostupa.spb.ru/the_sociophobic/kiss-graph.com/data/testt.json"))
  res.send(JSON.parse(fs.readFileSync(filePath, 'utf8')))
})
app.get('/data/position', async (req, res) => {
  const filePath = path.join(__dirname, '../../../client/src/libs/engines/data/hardcoded/DB', 'position.json')

  // res.sendFile("http://cdn.tochkadostupa.spb.ru/the_sociophobic/kiss-graph.com/data/position.json"))
  res.send(JSON.parse(fs.readFileSync(filePath, 'utf8')))
})
app.get('/data/uv', async (req, res) => {
  const filePath = path.join(__dirname, '../../../client/src/libs/engines/data/hardcoded/DB', 'uv.json')

  // res.sendFile("http://cdn.tochkadostupa.spb.ru/the_sociophobic/kiss-graph.com/data/uv.json"))
  res.send(JSON.parse(fs.readFileSync(filePath, 'utf8')))
})


const generateNewSessionToken = async (deviceInfo: string) => {
  const newSessionToken: SessionResType = new Session

  newSessionToken.deviceInfo = parseDeviceInfo(deviceInfo)
  await newSessionToken.save()

  return newSessionToken.id
}

app.post('/login', async (req, res) => {
  const { sessionToken, deviceInfo } = req.body

  if (!sessionToken)
    //GENERATE NEW SESSION TOKEN
    res.send({ newSessionToken: await generateNewSessionToken(deviceInfo) })
  else {
    const siteSession = await Session.findById({ id: sessionToken })

    if (!siteSession)
      //INVALID TOKEN. GENERATE NEW SESSION TOKEN
      res.send({ newSessionToken: await generateNewSessionToken(deviceInfo) })
    else {
      const person: PersonResType = await Person.findById({ id: siteSession.person })

      if (!person)
        //SESSION NOT CONNECTED TO ANY USER
        res.send({ message: "valid token. Not logged in" })
      else {
        //SESSION BELONGS TO USER
        res.send({ user: person })
      }
    }        
  }
})

app.post('/logout', async (req, res) => {
  const { sessionToken, deviceInfo } = req.body
  const siteSession: SessionResType = await Session.findById({ id: sessionToken })

  await siteSession.delete()

  //GENERATE NEW SESSION TOKEN
  res.send({ newSessionToken: await generateNewSessionToken(deviceInfo) })
})

// app.post('/login', async (req, res) => {
//   const { sessionToken } = req.body

//   if (!sessionToken)
//     //NO SESSION TOKEN
//     res.send({ message: 'no session token' })
//   else {
//     const siteSession: SessionResType = await Session.findById({ id: sessionToken })

//     if (!siteSession)
//     //INVALID TOKEN
//     res.send({ message: 'invalid session token' })
//   else {
//     if (siteSession.person)
//       //SESSION BELONGS TO USER
//       res.send({ message: "already logged in" })
//     else {
//       //SESSION NOT CONNECTED TO ANY USER

//       }
//     }
//   }
// })

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '../../../client/build', 'index.html')))

app.listen(3005, () => console.log(`App running at 3005`))
