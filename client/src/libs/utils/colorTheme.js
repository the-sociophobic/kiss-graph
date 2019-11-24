const accessor =
  window.matchMedia &&
  (window.matchMedia('(prefers-color-scheme: dark)') ||
  window.matchMedia('(prefers-color-scheme: light)')) &&
  (window.matchMedia('(prefers-color-scheme: dark)') ||
  window.matchMedia('(prefers-color-scheme: light)'))

const currentTheme = () =>
  accessor.matches
  ? "dark" : "light"

const addThemeEventListener = fn =>
  //somehow Safari doesn't have .addEventListener, but event still fires
  accessor && accessor.addEventListener && accessor
  .addEventListener("change", fn)

const removeThemeEventListener = fn =>
  accessor && accessor.removeEventListener && accessor
  .removeEventListener("change", fn)

export {
  currentTheme,
  addThemeEventListener,
  removeThemeEventListener,
}
