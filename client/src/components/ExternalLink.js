import React from 'react'

export default (props) => (
  <a
    className={props.className}
    href={props.to}
    target={props.newWindow ? "_blank" : ""}
    rel="noopener noreferrer"
  >
    {props.children}
  </a>
)