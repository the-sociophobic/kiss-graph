export default class listenersClass {
  constructor() {
    this.initialized = false
    this.initListeners = []
    this.updateListeners = []
  }

  addInitListener = fn => {
    this.initListeners.push(fn)
    this.initialized && this.callInitListeners()
  }

  callInitListeners = () => {
    this.initialized = true
    this.initListeners.forEach(listener => listener())
    this.updateListeners.forEach(listener => listener())
    this.initListeners = []
  }

  addUpdateListener = fn => {
    this.updateListeners.push(fn)
  }

  callUpdateListeners = () => {
    this.updateListeners.forEach(listener => listener())
  }
}