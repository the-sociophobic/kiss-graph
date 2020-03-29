import React from 'react'

import greenfrog from './custom/greenfrog.png'


const emojis = [
  {
    symbol: "💋",
    name: "kiss",
  },
  {
    symbol: "🏳️‍🌈",
    name: "gay",
  },
  {
    symbol: "🧠",
    name: "IQ",
  },
  {
    symbol: "😱",
    name: "mentalDisorder",
  },
  {
    symbol: "🙈",
    name: "hidden",
  },
  {
    symbol: "🗣",
    name: "told",
  },
  {
    symbol: "📬",
    name: "letter",
  },
  {
    symbol: "📅",
    name: "date",
  },
  {
    symbol: "📰",
    name: "newspaper",
  },
  {
    symbol: "👨‍❤️‍💋‍👨",
    name: "gay2",
  },
  {
    symbol: "🌎",
    name: "world",
  },
  {
    symbol: "💀",
    name: "dead",
  },
  {
    symbol: "💔",
    name: "offended",
  },
  {
    symbol: "🤬",
    name: "triggered",
  },
  {
    src: greenfrog,
    name: "greenfrog",
  },
  {
    symbol: "🛹",
    name: "skate",
  },
  {
    symbol: "👳🏽‍♀️",
    name: "hindu",
  },
  {
    symbol: "🎒",
    name: "school",
  },
  {
    symbol: "🎨",
    name: "artist",
  },
  {
    symbol: "🎤",
    name: "micro",
  },
  {
    symbol: "💻",
    name: "mac",
  },
  {
    symbol: "🌅",
    name: "acid",
  },
  {
    symbol: "⏳",
    name: "time",
  },
  {
    symbol: "📖",
    name: "book",
  },
  {
    symbol: "🤱🏻",
    name: "child",
  },
  {
    symbol: "🎸",
    name: "guitar",
  },
  {
    symbol: "🇮🇱",
    name: "jew",
  },
  {
    symbol: "💊",
    name: "pill",
  },
  {
    symbol: "🐞",
    name: "korovka",
  },
  {
    symbol: "🐠",
    name: "fish",
  },
  {
    symbol: "🐖",
    name: "pig",
  },
  {
    symbol: "💩",
    name: "shit",
  },
  {
    symbol: "🧱",
    name: "kirpich",
  },
  {
    symbol: "⚽️",
    name: "football",
  },
  {
    symbol: "🦆",
    name: "duck",
  },
  {
    symbol: "🌙",
    name: "moon",
  },
  {
    symbol: "🗽",
    name: "america",
  },
  {
    symbol: "🇷🇺",
    name: "russia",
  },
  {
    symbol: "🥖",
    name: "baton",
  },
  {
    symbol: "👑",
    name: "crown",
  },
  {
    symbol: "👰🏻",
    name: "married",
  },
  {
    symbol: "🤝",
    name: "friendship",
  },
  {
    symbol: "🚫",
    name: "chivalry",
  },
  {
    symbol: "🔞",
    name: "sex",
  },
  {
    symbol: "🎈",
    name: "baloon",
  },
  {
    symbol: "🧸",
    name: "toybear",
  },
  {
    symbol: "🎱",
    name: "fate",
  },
  {
    symbol: "🧔🏽",
    name: "beard",
  },
  {
    symbol: "🛁",
    name: "bath",
  },
  {
    symbol: "🛁",
    name: "bath",
  },
  {
    symbol: "🍌",
    name: "banana",
  },
  {
    symbol: "🍆",
    name: "baklazhan",
  },
]

const emojisArray = emojis
  .map(emoji => ({
    [emoji.name]: () => (
      <span
        className={`emoji emoji__${emoji.name}`}
        role="img"
        aria-label={emoji.name}
        title={emoji.name}
      >
        {emoji.symbol ? emoji.symbol :
        <img
          src={emoji.src}
          className="emoji__img"
        />}
      </span>
    )
  }))
  .reduce((a, b) => ({...a, ...b}))

export default emojisArray


const EmojiByName = props => emojisArray[props.name]()
// {
//   if (typeof emojisArray[props.name] === "undefined")
//     console.log(props.name)
//   return "a"//emojisArray[props.name]()
// }

export { EmojiByName }