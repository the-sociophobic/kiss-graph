import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import routes from './routes';
import Layout from 'components/Layout';
import 'styles/default.sass'

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <div>
        <Layout>
          <After data={data} routes={routes} />
        </Layout>
      </div>
    </BrowserRouter>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
