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
].map(emoji => ({
  [emoji.name]: () => (
    <span
      className={`emoji emoji__${emoji.name}`}
      role="img"
      aria-label={emoji.name}
    >
      {emoji.symbol}
    </span>
)})).reduce((a, b) => ({...a, ...b}))

