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

export default class DatePicker extends Component {
  constructor(props) {
    super(props)

    let myDateInstance
    if (typeof props.value !== "undefined" && props.value !== "")
      myDateInstance = new myDate(props.value)

    this.state = {
      ...Object.keys(numbersToInput)
        .map(key => ({
          [key + "Str"]: typeof myDateInstance === "undefined" ?
            ""
            :
            myDateInstance[numbersToInput[key].fn]()
        }))
        .reduce((a, b) => ({...a, ...b})),
      myDateInstance: myDateInstance,
      prevValue: props.value,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.prevValue) {
      const noValue = props.value === "" || typeof props.value === "undefined"

      state.prevValue = props.value
      state.myDateInstance = noValue ? undefined : new myDate(props.value)
      Object.keys(numbersToInput)
        .forEach(key =>
          state[key + "Str"] = noValue ?
            ""
            :
            state.myDateInstance[numbersToInput[key].fn]()
        )
    }

    return state
  }

  //PROBABLY OUTDATED
  checkDate = () => {
    if (typeof this.state.dateStr !== "undefined" &&
      this.state.dateStr.length > 0)
    {
      const dateClass = new myDate(this.state.dateStr)
      if (!dateClass.getTime().includes("NaN")) {
        this.setState({myDateInstance: dateClass})
        this.props.onChange(dateClass.getTime() / 1000)
      }
    }
    this.setState({myDateInstance: undefined})
    this.props.onChange(undefined)
  }

  recalcDate = (key, value) => {
    let newState = {
      ...this.state,
      [key + "Str"]: value,
    }

    this.setState({
      ...newState,
      myDateInstance: new myDate(
        encodeTime(
          Object.keys(numbersToInput)
            .map(key => ({[key]: newState[key + "Str"]}))
            .reduce((a, b) => ({...a, ...b}))
        ))
    })
  }

  render = () => (
    <div className="custom-date-picker">
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