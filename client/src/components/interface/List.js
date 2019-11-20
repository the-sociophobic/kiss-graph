import React from 'react'


export default props => (
  <div className="List">
    {props.items
      .map((item, index) => (
        <div
          key={index}
          className="List__Item"
        >
          {Array.isArray(item) ?
            item.map((part, index2) => (
              <div key={index + " " + index2}>
                {part}
              </div>))
            :
            item
          }
        </div>
      ))}
  </div>
)
