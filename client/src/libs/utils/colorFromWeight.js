const hexColors = [
  "af00ff",
  "0000ff",
  "00ffff",
  "00ff00",
  "ffff00",
  "ff8000",
  "b90000",
]

const colors = hexColors.map(color => ({
  r: parseInt(color.slice(0, 2), 16),
  g: parseInt(color.slice(2, 4), 16),
  b: parseInt(color.slice(4, 6), 16),
}))

export default (weight, theme) => {
  const length = colors.length - 1
  const start = Math.floor(weight * length)
  const end = Math.ceil(weight * length)
  const alpha = (weight * length) - start

  let newColor = {
    r: colors[start].r * (1 - alpha) + colors[end].r * alpha,
    g: colors[start].g * (1 - alpha) + colors[end].g * alpha,
    b: colors[start].b * (1 - alpha) + colors[end].b * alpha,
  }
  //add theme
  if (theme === "light")
    newColor = {
      r: 16 + newColor.r / 8 * 7,
      g: 16 + newColor.g / 8 * 7,
      b: 16 + newColor.b / 8 * 7,
    }
  if (theme === "dark")
    newColor = {
      r: newColor.r * .88,
      g: newColor.g * .88,
      b: newColor.b * .88,
    }
  newColor = {
    r: Math.round(newColor.r).toString(16),
    g: Math.round(newColor.g).toString(16),
    b: Math.round(newColor.b).toString(16)
  }
  newColor = {
    r: newColor.r.length === 2 ? newColor.r : "0" + newColor.r,
    g: newColor.g.length === 2 ? newColor.g : "0" + newColor.g,
    b: newColor.b.length === 2 ? newColor.b : "0" + newColor.b,
  }

  return "#" + newColor.r + newColor.g + newColor.b
}