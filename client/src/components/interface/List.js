import React from 'react'


export default props => (
  <div className="List">
    {props.items
      .map(item => (
        <div className="List__Item">
          {Array.isArray(item) ?
            item.map(part => <div>{part}</div>)
            :
            item
          }
        </div>
      ))}
  </div>
)
