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

        <div className='row mb-3'>
          <div className='mx-auto col-8 col-md-4 col-lg-4'>
            <img
              src={Icon}
              className='w-100 h-auto'
            />
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col d-flex flex-column align-items-center'>
            <h1 className='h1 text-center d-inline-block'>
              Kiss Graph 6.0.0
              <div className='w-100 mt-4'>
                {!context.sessionToken &&
                  <ExternalLink
                    newTab
                    to={`https://t.me/kiss_graph_bot?start=${''}`}
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

        {/* <div className='row'>
          <div className='mx-auto col-8 col-md-4 col-lg-4'>
          </div>
        </div> */}

      </div>
    </div>
  )
}


export default Login