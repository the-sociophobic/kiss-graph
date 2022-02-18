import React from 'react'

import storeClass from './storeClass'
import StoreContext from './StoreContext'


const initialState = stateRefs => ({
  ...stateRefs.state,
  store: new storeClass(stateRefs),
  threeSceneRef: React.createRef(),
  textInterfaceRef: React.createRef(),
})

export {
  storeClass,
  StoreContext,
  initialState,
}