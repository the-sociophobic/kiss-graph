import React, { Component } from 'react'

import { Style } from 'radium'

import StoreContext from 'libs/engines/data/store/StoreContext'
import colorFromWeight from 'libs/utils/colorFromWeight'


class WeightColorsStyle extends Component {
  render = () => {
    const { weightSet } = this.context.store.get()

    return (
        <Style
          scopeSelector=":root"
          rules={{
            ...weightSet.map((weight, index) => ({
                ["--weight-color-" + weight]: colorFromWeight(index / weightSet.length, "light")
              })
            ).reduce((a, b) => ({...a, ...b})),
            ...weightSet.map((weight, index) => ({
                ["--weight-color-" + weight + "-gray"]: colorFromWeight(index / weightSet.length, "light", "gray")
              })
            ).reduce((a, b) => ({...a, ...b})),
            // ...weightSet.map((weight, index) => ({
            //     ["--weight-color-" + weight + "-transparent"]: colorFromWeight(index / weightSet.length, "light", "transparent")
            //   })
            // ).reduce((a, b) => ({...a, ...b})),
            mediaQueries: {
              '(prefers-color-scheme: dark)': {
                ...weightSet.map((weight, index) => ({
                    ["--weight-color-" + weight]: colorFromWeight(index / weightSet.length, "dark")
                  })
                ).reduce((a, b) => ({...a, ...b})),
                ...weightSet.map((weight, index) => ({
                    ["--weight-color-" + weight + "-gray"]: colorFromWeight(index / weightSet.length, "dark", "gray")
                  })
                ).reduce((a, b) => ({...a, ...b})),
                // ...weightSet.map((weight, index) => ({
                //     ["--weight-color-" + weight + "-transparent"]: colorFromWeight(index / weightSet.length, "dark", "transparent")
                //   })
                // ).reduce((a, b) => ({...a, ...b})),
              }
            }
          }}
        >
      </Style>
    )
  }
}

WeightColorsStyle.contextType = StoreContext

export default WeightColorsStyle