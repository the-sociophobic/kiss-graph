import React from 'react'
import myDate from 'libs/utils/myDate'

//00 sec is OK
//01 sec -- minutes unknown
//02 sec -- hour unknown
//03 sec -- day unknown
//03 sec -- month unknown

const timeIsDefined = date => date.minute() !== 0 || date.hour() !== 0 ||
  !(date.second === 0 || date.second > 3)

//TODO bit mask for seconds
//0001 01 sec -- minutes unknown
//0010 02 sec -- hour unknown
//0100 04 sec -- day unknown
//1000 08 sec -- month unknown
const encodeTime = props => {
  let {
    year,
    month,
    day,
    hour,
    minute
  } = props
  let seconds = 0

  if (typeof minute === "undefined") {
    seconds = 1
    minute = 1
  }
  if (typeof hour === "undefined") {
    seconds = 2
    hour = 1
  }
  if (typeof day === "undefined") {
    seconds = 3
    day = 1
  }
  if (typeof month === "undefined") {
    seconds = 4
    month = 1
  }

  [
    month,
    day,
    hour,
    minute,
    seconds
  ].forEach(value => value = (value < 10 ? ("0" + value) : value))
  
  return (new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${seconds}`
  )).getTime()
}

export default props => {
  const date = new myDate(props.date, "RU")

  return (
    <span className={props.className}>
      {timeIsDefined(date) ? date.time() : "?? : ??"}
    </span>
  )
}

export {
  timeIsDefined,
  encodeTime,
}