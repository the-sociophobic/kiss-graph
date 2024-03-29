import React from 'react'


export default props =>
  <div
    className={`custom-checkbox ${props.value && "custom-checkbox--checked"} ${props.className}`}
    onClick={() => props.onChange(!props.value)}
  >
    {props.children}
  </div>