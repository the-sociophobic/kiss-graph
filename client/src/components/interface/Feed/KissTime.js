import React from 'react'
import myDate from 'libs/utils/myDate'


export default props => {
  const date = new myDate(props.date, "RU")

  return (
    <span className={props.className}>
      {date.minute() !== 0 ? date.time() : "?? : ??"}
    </span>
  )
}