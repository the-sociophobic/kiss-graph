import React from 'react'

import StoreContext from 'libs/engines/data/store/StoreContext'
import ExternalLink from './ExternalLink'
import Icon from '../img/Icon.png'
import TelegramLogo from '../img/telegramLogo.svg'


const Login = (props) => {
  const context = React.useContext(StoreContext)

  return (
    <div className='Login'>
      <div className='container d-flex flex-grow-1 flex-column justify-content-center'>
        <div className='row'>
          <div className='col d-flex flex-column align-items-center'>
            <h1 className='h1 text-center d-inline-block'>
              <div className='Login__logo mb-3'>
                <img
                  src={Icon}
                  className='Login__logo__item abs-container'
                />
              </div>
              Kiss Graph 6.0.0
              <div className='w-100 mt-4'>
                {context.sessionToken &&
                  <ExternalLink
                    newTab
                    to={`https://t.me/kiss_graph_bot?start=${context.sessionToken}`}
                    className='Login__authorize'
                  >
                    <div className='inline-block mr-2'>
                      Authorize
                    </div>
                    <img
                      src={TelegramLogo}
                      className='Login__authorize__logo'
                    />
                  </ExternalLink>
                }
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login