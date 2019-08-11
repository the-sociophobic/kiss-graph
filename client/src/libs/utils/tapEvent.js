export default (element, fn, ms) => {
  var timer, touchStarted = false

  const registerTapHandler = () => {
    timer = setTimeout(() => unregisterTapHandler(), ms || 300)
    touchStarted = true
  }

  const unregisterTapHandler = () => {
    touchStarted = false
    clearTimeout(timer)
  }

  const tapHandler = () => {
    if (touchStarted)
      fn()
    unregisterTapHandler()
  }

  element.on('touchstart', registerTapHandler)
  element.on('touchend', tapHandler)
}