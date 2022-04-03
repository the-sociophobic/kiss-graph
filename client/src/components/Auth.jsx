import React from 'react'
import Cookies from 'universal-cookie'
import { deviceDetect } from 'react-device-detect'
import _ from 'lodash'

import { post } from '../libs/utils/API'

class Auth extends React.Component {
  state = {
    user: undefined,
    sessionToken: undefined
  }

  cookies = new Cookies()
  checkInterval = null

  // componentDidMount = () =>
  //   this.checkUser()

  checkUser = async () => {
    const res = await post('/login', {
      sessionToken: this.cookies.get('sessionToken'),
      deviceInfo: JSON.stringify(deviceDetect())
    })

    console.log(res)
  
    if (res.newSessionToken)
      this.cookies.set('sessionToken', res.newSessionToken, { path: '/' })
  
    this.setState({ sessionToken: this.cookies.get('sessionToken') })
  
    if (res.hasOwnProperty('user'))
      this.setState({ user: res.user })
  }

  logout = async () => {
    if (_.isEmpty(this.state.user))
      return
      
    const res = await post('/logout', {
      sessionToken: this.cookies.get('sessionToken'),
      deviceInfo: JSON.stringify(deviceDetect())
    })

    this.cookies.set('sessionToken', res.newSessionToken, { path: '/' })

    this.setState({
      user: undefined,
      sessionToken: this.cookies.get('sessionToken')
    })
  }

  checkIfLogged = () => {
    // if (this.checkInterval) {
    //   if (!_.isEmpty(this.state.user))
    //     clearInterval(this.resendCountdownInterval)
    //   return
    // }

    let tries = 0

    this.checkInterval = setInterval(() => {
      if (!_.isEmpty(this.state.user) || tries > 10) {
        clearInterval(this.checkInterval)
        //CLOSE LOGIN
        ;
      }
      this.checkUser()
      tries++
    }, 500)
  }
}


export default Auth