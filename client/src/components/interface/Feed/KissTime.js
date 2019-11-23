import React from 'react'
import myDate from 'libs/utils/myDate'

//00 sec is OK
//01 sec -- minutes unknown
//02 sec -- hour unknown
//03 sec -- day unknown
//03 sec -- month unknown

const timeIsDefined = date => date.minute() !== 0 || date.hour() !== 0 ||
  !(date.second === 0 || date.second > 3)

export default props => {
  const date = new myDate(props.date, "RU")

  return (
    <span className={props.className}>
      {timeIsDefined(date) ? date.time() : "?? : ??"}
    </span>
  )
}