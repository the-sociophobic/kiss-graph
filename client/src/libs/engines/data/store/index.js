import React from 'react'

import storeClass from './storeClass'
import StoreContext from './StoreContext'


const initialState = stateRefs => ({
  store: new storeClass(stateRefs),
  threeSceneRef: React.createRef(),
  textInterfaceRef: React.createRef(),
})

export {
  storeClass,
  StoreContext,
  initialState,
}