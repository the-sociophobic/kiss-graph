import greenfrog from './custom/greenfrog.png'
import arsenyan from './custom/arsenyan.png'


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
    src: arsenyan,
    name: "arsenyan",
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
    symbol: "💾",
    name: "copy",
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
    symbol: "⌛",
    name: "timeup",
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
    symbol: "🍌",
    name: "banana",
  },
  {
    symbol: "🍆",
    name: "baklazhan",
  },
  {
    symbol: "👌🏻",
    name: "ok",
  },
  {
    symbol: "⚖️",
    name: "justice",
  },
  {
    symbol: "📿",
    name: "prayerBeads",
  },
  {
    symbol: "💉",
    name: "syringe",
  },
  {
    symbol: "💀",
    name: "skull",
  },
  {
    symbol: "🌦",
    name: "lilRain",
  },
  {
    symbol: "🍵",
    name: "tea",
  },
  {
    symbol: "🦊",
    name: "fox",
  },
  {
    symbol: "📸",
    name: "photo",
  },
  {
    symbol: "🥾",
    name: "boot",
  },
  {
    symbol: "📺",
    name: "tv",
  },
  {
    symbol: "🧚🏼‍♀️",
    name: "feya",
  },
  {
    symbol: "🥭",
    name: "mango",
  },
  {
    symbol: "📸",
    name: "photoShot",
  },
  {
    symbol: "👙",
    name: "bikini",
  },
  {
    symbol: "🙅🏻‍♀️",
    name: "womanBan",
  },
  {
    symbol: "🤺",
    name: "saber",
  },
  {
    symbol: "🇪🇸",
    name: "Spain",
  },
  {
    symbol: "🛏",
    name: "krovatka",
  },
  {
    symbol: "🏥",
    name: "hospital",
  },
  {
    symbol: "🧝🏼‍♀",
    name: "elf",
  },
  {
    symbol: "🥦",
    name: "vegan",
  },
  {
    symbol: "💡",
    name: "light",
  },
  {
    symbol: "🐦",
    name: "pigeon",
  },
  {
    symbol: "🐸",
    name: "frog",
  },
  {
    symbol: "💁🏻‍♂️",
    name: "male",
  },
  {
    symbol: "💁🏻‍♀️",
    name: "female",
  },
  {
    symbol: "👤",
    name: "person",
  },
  {
    symbol: "🧬",
    name: "gene",
  },
  {
    symbol: "🏆",
    name: "winner",
  },
  {
    symbol: "🕹",
    name: "gamepad",
  },
  {
    symbol: "👈🏻",
    name: "pointer",
  },
  {
    symbol: "🔌",
    name: "sex",
  },
  {
    symbol: "❤️",
    name: "heart",
  },
  {
    symbol: "💔",
    name: "heartBroken",
  },
  {
    symbol: "📁",
    name: "folder",
  },
  {
    symbol: "📏",
    name: "ruler",
  },
  {
    symbol: "👩🏻‍🚀",
    name: "spaceman",
  },
  {
    symbol: "🚢",
    name: "ship",
  },
  {
    symbol: "🌐",
    name: "browser",
  },
  {
    symbol: "🌺",
    name: "flower",
  },
  {
    symbol: "🐍",
    name: "snake",
  },
  {
    symbol: "🎭",
    name: "theater",
  },
  {
    symbol: "🎥",
    name: "kinocamera",
  },
  {
    symbol: "⚗️",
    name: "alchemy",
  },
  {
    symbol: "👩🏼‍⚖️",
    name: "judge",
  },
  {
    symbol: "🎿",
    name: "ski",
  },
  {
    symbol: "🍺",
    name: "beer",
  },
  {
    symbol: "🇩🇪",
    name: "germany",
  },
  {
    symbol: "🐓",
    name: "cock",
  },
  {
    symbol: "🤖",
    name: "robot",
  },
]

export default emojis