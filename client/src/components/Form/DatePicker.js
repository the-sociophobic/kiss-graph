import React, { Component, Fragment } from 'react'

import Input from 'components/Form/Input'
import KissTime, { encodeTime } from 'components/interface/Feed/KissTime'

import myDate from 'libs/utils/myDate'


const numbersToInput = {
  day: { 
    range: [1, 31],
    fn: "day",
    label: "dd",
    after: "/",
  }, //TODO
  month: {
    range: [1, 12],
    fn: "month",
    label: "mm",
    after: "/",
  },
  year: {
    range: [-10000, 3000],
    fn: "year",
    label: "yyyy",
  }, //TODO for Jesus
  hour: {
    range: [0, 23],
    fn: "hour",
    label: "hh",
    after: ":",
  },
  minute: {
    range: [0, 59],
    fn: "minute",
    label: "mm",
  }
}

const numbersFromMyDateInstance = myDateInstance =>
  Object.keys(numbersToInput)
  .map(key => ({
    [key + "Str"]: typeof myDateInstance === "undefined" ?
      ""
      :
      myDateInstance[numbersToInput[key].fn]()
  }))
  .reduce((a, b) => ({...a, ...b}))


export default class DatePicker extends Component {
  constructor(props) {
    super(props)

    let myDateInstance
    if (typeof props.value !== "undefined" && props.value !== "")
      myDateInstance = new myDate(props.value)

    this.state = {
      ...numbersFromMyDateInstance(myDateInstance),
      myDateInstance: myDateInstance,
      prevValue: props.value,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.prevValue) {
      const myDateInstance = (props.value === "" || typeof props.value === "undefined") ?
        undefined : new myDate(props.value)

      state = {
        ...state,
        prevValue: props.value,
        myDateInstance: myDateInstance,
        ...numbersFromMyDateInstance(myDateInstance)
      }
    }

    return state
  }

  recalcDate = (key, value) => {
    let newState = {
      ...this.state,
      [key + "Str"]: value,
    }

    const myDateInstance = new myDate(
      encodeTime(
        Object.keys(numbersToInput)
          .map(key => ({[key]: newState[key + "Str"]}))
          .reduce((a, b) => ({...a, ...b}))
      )
    )

    if (isNaN(myDateInstance.getTime()))
      this.setState({
        ...newState,
        myDateInstance: myDateInstance
      })
    else
      this.props.onChange(myDateInstance.getTime() / 1000)
  }

  render = () => (
    <div className="custom-date-picker">
      <div className="custom-date-picker__label">
        {this.props.label}
      </div>
      <div className="custom-date-picker__inputs">
        {Object.keys(numbersToInput).map(key => (
          <Fragment>
            <Input
              number
              range={numbersToInput[key].range}
              className={"custom-date-picker__inputs__item custom-date-picker__inputs__item--" + key}
              value={this.state[key + "Str"]}
              onChange={value => this.recalcDate(key, value)}
              // placeholder={numbersToInput[key].label}
              label={numbersToInput[key].label}
              // onBlur={() => this.checkDate()}
            />
            <div className="custom-date-picker__inputs__after">
              {numbersToInput[key].after}
            </div>
          </Fragment>
        ))}
      </div>
      <div className="custom-date-picker__res">
        {this.state.myDateInstance &&
          (this.state.myDateInstance.time() + " " + this.state.myDateInstance.toStringDot())
        }
      </div>
    </div>
  )
}