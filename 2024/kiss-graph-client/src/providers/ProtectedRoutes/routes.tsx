import Main from '../../pages/Main'
import Redirect from './Redirect'


export type RouteType = {
  to: string
  title: string
  Comp: any
  exact?: boolean
}


const routes: RouteType[] = [
  {
    to: '/',
    exact: true,
    title: 'Главная',
    Comp: <Main />,
  },
  {
    to: '/*',
    title: 'redirect',
    Comp: <Redirect to='/' />,
  },
]


export default routes
