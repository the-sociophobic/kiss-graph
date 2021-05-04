import React from 'react'

import { Link } from 'react-router-dom'

import { EmojiByName } from 'components/Emoji'
import myDate from 'libs/utils/myDate'
import isProduction from 'libs/utils/isProduction'


const renderPropValue = props => {
  switch (props.prop) {
    case "IQ":
      return props.user.iq
    case "mass":
      return props.user.weight + "kg"
    case "height":
      return props.user.height + "cm"
    case "gay":
      return props.user.gay + "%"
    case "sposes":
      return props.user[props.prop].length
    case "date":
      return props.user[props.prop].length
    case "breakup":
      return props.user[props.prop].length
    case "debated":
      return props.user[props.prop].length
    default:
      return props.user[props.prop]
  }
}

export default props => {
  if (props.simple)
    return (
      <div className="username-link username-link--simple">
        <div
          className="link d-inline-flex flex-row align-items-center"
          // style={{color: `var(--weight-color-${props.user.connections}-gray)`}}
          style={{color: `var(--weight-color-${props.user.connections})`}}
          onClick={() => props.setNode(props.user)}
        >
          <div className='link__short-name'>
            {props.user.userName ? ("@" + props.user.userName) : props.user.name}
          </div>{props.emoji &&
            <EmojiByName name={props.emoji} />}
        </div>
      </div>
    )
  if (props.prop)
    return (
      <div
        className="username-link"
        key={props.user.name}
        // style={{color: `var(--weight-color-${
        //   (props.prop === "bmim" || props.prop === "height") ? props.user.am :
        //   (props.prop === "bmif" || props.prop === "height") ? props.user.af :
        //   props.user.connections
        // })`}}
        style={{color: `var(--weight-color-${props.user.connections})`}}
      >
        {typeof props.emoji === 'string' &&
          <div className="username-link__type">
            <EmojiByName name={props.emoji} />
          </div>
        } 
        <div className="username-link__number">
          {renderPropValue(props)}
          {/* {props.IQ && props.user.iq}
          {props.mentalDisorder && props.user.mentalDisorder}
          {props.gay && (props.user.gay + "%")} */}
        </div>
        <div className="username-link__name">
          <span
            className="link"
            onClick={() => props.setNode(props.user)}
          >
            {props.user.userName ? ("@" + props.user.userName) : props.user.name}
            {props.user.emoji && <EmojiByName name={props.user.emoji} />}
          </span>
        </div>
        {props.date &&
          <div className="username-link__date">
            {new myDate(props.date).toStringDot()}
          </div>}
      </div>
    )
  return (
    <div
      className="username-link"
      key={props.user.name}
      style={{color: `var(--weight-color-${props.user.connections})`}}
    >
      {typeof props.emoji === 'string' &&
        props.emojiLink ?
          <Link
            className="username-link__type"
            to={props.emojiLink}
          >
            <EmojiByName name={props.emoji} />
          </Link>
          :
          <div className="username-link__type">
            <EmojiByName name={props.emoji} />
          </div>
      } 
      <div className="username-link__number">
        {props.user.connections}
      </div>
      <div className="username-link__name">
        <span
          className="link"
          onClick={() => props.setNode(props.user)}
        >
          {props.user.userName ? ("@" + props.user.userName) : props.user.name}
          {props.user.emoji && <EmojiByName name={props.user.emoji} />}
        </span>
      </div>
      {!isProduction() && props.user.gender}
      {props.date &&
        <div className="username-link__date">
          {new myDate(props.date).toStringDot()}
        </div>}
    </div>
  )
}