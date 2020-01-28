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
  console.log(props)
  let {
    year,
    month,
    day,
    hour,
    minute
  } = props
  let seconds = 0

  if (typeof minute === "undefined" || minute === "") {
    seconds = 1
    minute = 1
  }
  if (typeof hour === "undefined" || hour === "") {
    seconds = 2
    hour = 1
  }
  if (typeof day === "undefined" || day === "") {
    seconds = 3
    day = 1
  }
  if (typeof month === "undefined" || month === "") {
    seconds = 4
    month = 1
  }

  const addZero = number => {
    if (typeof number === "number")
      return number < 10 ? ("0" + number) : number
    if (typeof number === "string")
      return number.length === 1 ? ("0" + number) : number
    return number
  }
  const date = new Date(
    `${year}-${addZero(month)}-${addZero(day)}T${addZero(hour)}:${addZero(minute)}:${addZero(seconds)}`
  )
  console.log(date)
  return date.getTime() / 1000
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