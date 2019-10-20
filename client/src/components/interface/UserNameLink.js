import React from 'react'

import myDate from 'libs/utils/myDate'


export default props => props.simple ?
  (
    <div
      className="username-link--simple"
      // style={{color: props.user.color}}
    >
      <span
        className="link"
        onClick={() => props.setNode(props.user.name)}
      >
        {props.user.userName ? ("@" + props.user.userName) : props.user.name}
      </span>
    </div>
  )
  :
  (
    <div
      className="username-link"
      key={props.user.name}
      style={{color: props.user.color}}
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