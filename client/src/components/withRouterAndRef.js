import React, { Component } from 'react'
import { withRouter } from 'react-router'


export default WrappedComponent => {
  class InnerComponentWithRef extends Component { 
    render() {
      const { forwardRef, ...rest } = this.props
      
      return (
        <WrappedComponent
          {...rest}
          ref={forwardRef}
        />
      )
    }
  }

  const ComponentWithRouter = withRouter(InnerComponentWithRef, { withRef: true })

  return React.forwardRef((props, ref) =>
    <ComponentWithRouter
      {...props}
      forwardRef={ref}
    />
  )
}