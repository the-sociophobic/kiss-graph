import React from 'react'
import myDate from 'libs/utils/myDate'


const timeIsDefined = date => date.minute() !== 0 || date.second() !== 0 || date.hour() !== 0

export default props => {
  const date = new myDate(props.date, "RU")

  return (
    <span className={props.className}>
      {timeIsDefined(date) ? date.time() : "?? : ??"}
    </span>
  )
}