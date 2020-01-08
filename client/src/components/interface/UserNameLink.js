import React from 'react'

import myDate from 'libs/utils/myDate'


export default props => {
  if (props.simple)
    return (
      <div className="username-link username-link--simple">
        <span
          className="link"
          style={{color: `var(--weight-color-${props.user.connections}-gray)`}}
          onClick={() => props.setNode(props.user.name)}
        >
          {props.user.userName ? ("@" + props.user.userName) : props.user.name}
        </span>
      </div>
    )
  if (props.IQ || props.mentalDisorder)
    return (
      <div
        className="username-link"
        key={props.user.name}
        style={{color: `var(--weight-color-${props.user.connections})`}}
      >
        <div className="username-link__number">
          {props.IQ && props.user.iq}
          {props.mentalDisorder && props.user.mentalDisorder}
        </div>
        <div className="username-link__name">
          <span
            className="link"
            onClick={() => props.setNode(props.user.name)}
          >
            {props.user.userName ? ("@" + props.user.userName) : props.user.name}
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
      <div className="username-link__number">
        {props.user.connections}
      </div>
      <div className="username-link__name">
        <span
          className="link"
          onClick={() => props.setNode(props.user.name)}
        >
          {props.user.userName ? ("@" + props.user.userName) : props.user.name}
        </span>
      </div>
      {props.date &&
        <div className="username-link__date">
          {new myDate(props.date).toStringDot()}
        </div>}
    </div>
  )
}