import React from 'react'

export default props => (
  <div className="interface-block">
    <div className="interface-block__backdrop" />
    <div className="interface-block__content">
      {props.children || '...'}
    </div>
  </div>
)