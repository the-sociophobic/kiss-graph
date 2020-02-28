import React from 'react'

// import Emoji from 'components/Emoji'

import kiss from './kiss.png'


export default props => (
  <div className="loader">
    <div className="loader__container">
      <div className="loader__emoji__container">
        <img className="emoji" src={kiss} alt="kiss" />
        {/* <Emoji.kiss /> */}
      </div>
      <div className="loader__text">
        {props.text}
      </div>
    </div>
  </div>
)
