import React from 'react'
import { Link } from 'react-router-dom'


export default props => props.simple ?
  (
    <div
      className="username-link--simple"
      // style={{color: props.user.color}}
    >
      <Link
        to={props.user.link}
        onClick={() => props.setNode(props.user.name)}
      >
        {props.user.userName ? ("@" + props.user.userName) : props.user.name}
      </Link>
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
        <Link
          to={props.user.link}
          onClick={() => props.setNode(props.user.name)}
        >
          {props.user.userName ? ("@" + props.user.userName) : props.user.name}
        </Link>
      </div>
    </div>
  )