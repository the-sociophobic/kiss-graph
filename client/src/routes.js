import React from 'react'

import About from 'pages/About'
import Donations from 'pages/Donations'
import Bitcoins from 'pages/Bitcoins'
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
]