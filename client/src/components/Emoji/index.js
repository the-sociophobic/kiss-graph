import React from 'react'
import emojis from './list'


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