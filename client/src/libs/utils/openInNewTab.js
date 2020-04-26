const openInNewTab = (url, focus) => {
  const tab = window.open(url, '_blank')
  focus && tab.focus()
}

export default openInNewTab