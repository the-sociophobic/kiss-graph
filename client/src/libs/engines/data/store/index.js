import storeClass from './storeClass'
import StoreContext from './StoreContext'

const initialState = stateRefs => ({
  store: new storeClass(stateRefs),
})

export {
  storeClass,
  StoreContext,
  initialState,
}