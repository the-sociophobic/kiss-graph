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

export default (weight, tone) => {
  const length = colors.length - 1
  const start = Math.floor(weight * length)
  const end = Math.ceil(weight * length)
  const alpha = (weight * length) - start

  let newColor = {
    r: colors[start].r * (1 - alpha) + colors[end].r * alpha,
    g: colors[start].g * (1 - alpha) + colors[end].g * alpha,
    b: colors[start].b * (1 - alpha) + colors[end].b * alpha,
  }
  //add tone
  if (tone === "light")
    newColor = {
      r: 127 + newColor.r / 2,
      g: 127 + newColor.g / 2,
      b: 127 + newColor.b / 2,
    }
  if (tone === "dark")
    newColor = {
      r: newColor.r * .9,
      g: newColor.g * .9,
      b: newColor.b * .9,
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