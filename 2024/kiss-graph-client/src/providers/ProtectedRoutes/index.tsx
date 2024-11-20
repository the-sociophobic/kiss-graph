import React, { useMemo } from 'react'

import { RouterProvider, createHashRouter } from 'react-router-dom'

import Layout from '../../components/Layout'
import routes, { RouteType } from './routes'
import Redirect from './Redirect'


export type ProtectedRoutesProps = object

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {

  const router = useMemo(
    () => createHashRouter(
      mapRoutes(routes)
    )
    , []
  )

  return <RouterProvider router={router} />
}


export default ProtectedRoutes


const mapRoutes = (
  routes: RouteType[],
) =>
  routes.map(route => ({
    key: route.to,
    path: route.to,
    element: (
      <Layout title={route.title} >
        {route.Comp}
      </Layout>
    ),
    errorElement: <Redirect to='/' />
  }))
