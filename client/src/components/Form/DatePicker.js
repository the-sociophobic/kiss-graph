import React, { Component } from 'react'

import Input from 'components/Form/Input'
import KissTime from 'components/interface/Feed/KissTime'

import myDate from 'libs/utils/myDate'


const numbersToInput = {
  day: { range: [1, 31] }, //TODO
  month: { range: [1, 12] },
  year: { range: [-10000, 3000] }, //TODO for Jesus
  hour: { range: [0, 23] },
  minute: { range: [0, 59] }
}

export default class DatePicker extends Component {
  dateStructor(props) {
    super(props)
    this.state = {
      ...Object.keys(numbersToInput)
        .map(key => ({[key + "Str"]: ""}))
        .reduce((a, b) => ({...a, ...b})),
      myDateInstance: undefined
    }
  }

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

  render = () => (
    <div className="custom-date-picker">
      <div className="custom-date-picker__inputs">
        {Object.keys(numbersToInput).map(key => (
          <Input
            number
            range={numbersToInput[key].range}
            className={"custom-date-picker__" + key}
            value={this.state[key + "Str"]}
            onChange={value => this.setState({[key + "Str"]: value})}
            placeholder={key}
            // onBlur={() => this.checkDate()}
          />
        ))}
        {/* <Input
          className="custom-date-picker__date"
          value={this.state.dateStr}
          onChange={value => this.setState({dateStr: value})}
          placeholder="date"
          onBlur={() => this.checkDate()}
        />
        <Input
          className="custom-date-picker__date"
          value={this.state.dateStr}
          onChange={value => this.setState({dateStr: value})}
          placeholder="date"
          onBlur={() => this.checkDate()}
        />
        <Input
          number
          range={[0, 23]}
          className="custom-date-picker__hour"
          value={this.state.hourStr}
          onChange={value => this.setState({hourStr: value})}
          placeholder="hour"
        />
        :
        <Input
          number
          range={[0, 59]}
          className="custom-date-picker__minute"
          value={this.state.minuteStr}
          onChange={value => this.setState({minuteStr: value})}
          placeholder="min"
        /> */}
      </div>
      <div className="custom-date-picker__res">
        {this.state.myDateInstance &&
          <KissTime
            date={this.state.myDateInstance.getTime()}
            className="custom-date-picker__kiss-time"
          />
        }
      </div>
    </div>
  )
}