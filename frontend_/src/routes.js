import React from 'react';

import { asyncComponent } from '@jaredpalmer/after';

import Layout from 'components/Layout'

// export default [
export default [{
  path: '/',
  component: Layout,
  routes: [
    {
      path: '/',
      exact: true,
      component: asyncComponent({
        loader: () => import('pages/Home'), // required
        Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
      }),
    },
    {
      path: '/about',
      exact: true,
      component: asyncComponent({
        loader: () => import('pages/About'), // required
        Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
      }),
    },
  // ];
]}];
