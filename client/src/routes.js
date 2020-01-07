import Donations from 'pages/Donations'
import Bitcoins from 'pages/Bitcoins'
import Layout from 'components/Layout'


export default [
  {
    path: '/donations',
    component: Donations,
  },
  {
    path: '/btc',
    component: Bitcoins,
  },
  {
    path: '/*',
    // exact: true,
    component: Layout,
  },
]