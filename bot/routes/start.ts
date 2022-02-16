import TelegramBot from 'node-telegram-bot-api'

import Person, { PersonResType } from '../models/Person'
import Session, { SessionResType } from '../models/Session'
import whiteList from '../utils/whiteList'
import { nihilistChatId } from '../utils/chatIds'
import printUsername from '../utils/printUsername'


const start = (bot: TelegramBot) => {
  // INITIALIZE BOT IN PRIVATE CHAT
  bot.onText(/(.*?)/, async (msg: TelegramBot.Message, match: RegExpExecArray | null) => {
    const sessionToken = match[1]

    if (sessionToken.includes('undefined'))
      return

    let siteSession: SessionResType = await Session.findById({ id: sessionToken })

    if (!siteSession)
      //INVALID SESSION TOKEN
      bot.sendMessage(msg.chat.id, `outdated session`)
    else {
      let person: PersonResType = await Person.findById({ id: siteSession.person })

      if (person)
        bot.sendMessage(msg.chat.id, `Already logged in`)
      else {
        person = await Person.findByTelegramUserId(msg.from.id)

        if (person) {
          siteSession.person = person.id
          await siteSession.save()
          bot.sendMessage(msg.chat.id, `Successfull log in. Return to kiss-graph.com`)
          bot.sendMessage(nihilistChatId, `${printUsername(msg.from)} logged to kiss-graph.com`, { parse_mode: 'MarkdownV2' })
        } else {
          person = new Person
          person.telegramChatId = msg.chat.id
          person.telegramUserId = msg.from.id
          if (whiteList.includes(msg.from.username))
            person.agency = true
          await person.save()

          siteSession.person = person.id
          await siteSession.save()

          bot.sendMessage(msg.chat.id, `Successfull first log in. Return to kiss-graph.com`)
          bot.sendMessage(nihilistChatId, `${printUsername(msg.from)} registered to kiss-graph.com`, { parse_mode: 'MarkdownV2' })
        }
      }
    }
  })
}


export default start
