import React from 'react'

import About from 'pages/About'
import Donations from 'pages/Donations'
import Bitcoins from 'pages/Bitcoins'
import Kontrol from 'pages/Kontrol'
import Layout from 'components/Layout'
import { Redirect } from 'react-router-dom'

export default [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/node/' />,
  },
  // {
  //   path: '/node',
  //   component: () => <Redirect to='/node/' />,
  // },
  {
    path: '/node/*', // .../ !== .../:nodeId (((((
    component: Layout,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/donations',
    component: Donations,
  },
  {
    path: '/btc',
    component: Bitcoins,
  },
  {
    path: '/kontrol',
    component: Kontrol,
  },
  {
    path: '/feed',
    component: () => <Redirect to={{pathname: '/node/', state: { from: '/feed' }}} />,
  },
]