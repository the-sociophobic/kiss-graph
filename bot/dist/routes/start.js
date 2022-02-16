"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const start = (bot) => {
    // INITIALIZE BOT IN PRIVATE CHAT
    bot.onText(/(.*?)/, (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('a');
        bot.sendMessage(msg.chat.id, msg.chat.id + '');
        // const sessionToken = match[1]
        // if (sessionToken.includes('undefined'))
        //   return
        // let siteSession: SessionResType = await Session.findById({ id: sessionToken })
        // if (!siteSession)
        //   //INVALID SESSION TOKEN
        //   bot.sendMessage(msg.chat.id, `outdated session`)
        // else {
        //   let person: PersonResType = await Person.findById({ id: siteSession.person })
        //   if (person)
        //     bot.sendMessage(msg.chat.id, `Already logged in`)
        //   else {
        //     person = await Person.findByTelegramUserId(msg.from.id)
        //     if (person) {
        //       siteSession.person = person.id
        //       await siteSession.save()
        //       bot.sendMessage(msg.chat.id, `Successfull log in. return to kiss-graph.com`)
        //       bot.sendMessage()
        //     } else {
        //       if ()
        //     }
        //   }
        // }
    }));
};
exports.default = start;
//# sourceMappingURL=start.js.map