const currentTheme = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
  ? "dark" : "light"

const addThemeEventListener = fn =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener("change", fn)

const removeThemeEventListener = fn =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)')
  .removeEventListener("change", fn)

export {
  currentTheme,
  addThemeEventListener,
  removeThemeEventListener,
}
