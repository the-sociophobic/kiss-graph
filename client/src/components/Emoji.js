import React from 'react'

export default [
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
].map(emoji => ({
  [emoji.name]: () => (
    <span
      className={`emoji emoji__${emoji.name}`}
      role="img"
      aria-label={emoji.name}
      title={emoji.name}
    >
      {emoji.symbol}
    </span>
)})).reduce((a, b) => ({...a, ...b}))

