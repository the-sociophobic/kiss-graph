import TelegramBot from 'node-telegram-bot-api'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import { mongoDB } from './utils/URLs'
import start from './routes/start'


dotenv.config({ path: '.env' })


const main = async () => {
  console.log('Starting bot...')
  const BOT_API_TOKEN=process.env.BOT_API_TOKEN;
  const bot = new TelegramBot(
      BOT_API_TOKEN,
    { polling: true }
  )

  // CONNECT DB
  const beginConnectingTimestamp = Date.now()
  await mongoose.connect(mongoDB)
  console.log(`Connected to Mongo in ${(Date.now() - beginConnectingTimestamp) / 1000}s`)

  // INITIALIZE BOT COMMAND
  start(bot)

  console.log('All routes set')
}

main()