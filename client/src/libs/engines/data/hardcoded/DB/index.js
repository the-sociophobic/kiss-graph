import { nameToPath } from 'libs/utils/stringTransforms'

// import data from './24.11.19.json'
import mainData from './testt.json'
import position from './position.json'
import uv from './uv.json'


const data = {
  ...mainData,
  geometry: {
    position: position,
    uv: uv,
  },
}

export {
  data
}