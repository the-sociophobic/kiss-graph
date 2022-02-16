import TelegramBot from 'node-telegram-bot-api'

import fixStringForMarkdownV2 from './fixStringForMarkdownV2'


//when using this function, pass { parse_mode: 'MarkdownV2' } to bot.sendMessage()
const printUsername = (user: TelegramBot.User | TelegramBot.Chat): string =>
  user.username ?
    `@${fixStringForMarkdownV2(user.username)}`
    :
    `[${fixStringForMarkdownV2(user.first_name)}${user.last_name ?
      ` ${fixStringForMarkdownV2(user.last_name)}`
      :
      ''
    }](tg://user?id=${user.id})`


export default printUsername