const hexColors = [
  "af00ff",
  "0000ff",
  "00ffff",
  "00ff00",
  "ffff00",
  "ff8000",
  "b90000",
]

const colors = hexColors.map(color => parseInt(color, 16))

export default weight => {
  const start = Math.floor(weight * colors.length)
  const end = Math.ceil(weight * colors.length)
  const alpha = weight - start
  const dec = colors[start] * (alpha - 1) + colors[end] * alpha
  
  return dec
}