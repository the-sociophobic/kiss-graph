import Home from 'pages/Home'
import About from 'pages/About'
import Layout from 'components/Layout'

export default [
  {
    path: '/*',
    exact: true,
    component: Layout,
  },
  // {
  //   path: '/about',
  //   component: About,
  // },
]