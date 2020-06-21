import node from './node'
import { socialLinks } from 'libs/utils/social'


export default {
  ...node,
  uv: {type: "number", local: true},
  social: {
    type: "object",
    fields: Object.keys(socialLinks)
      .map(key => ({[key]: {type: "string"}}))
      .reduce((a, b) => ({...a, ...b}))
  },

  staticPos: {type: "boolean"},
  pos: {type: "point3d"},
  iq: {type: "number", canBeString: true},
  iq2: {type: "number", canBeString: true},
  mentalDisorder: {type: "string"},
  gender: {type: "select", options: [
    "m",
    "f"
  ], canBeUndefined: true},
  dead: {type: "boolean"},
  offended: {type: "boolean"},
  height: {type: "number"},
  weight: {type: "number"},
  fWHR: {type: "number"},
  SHR: {
    type: "object",
    fields: {
      shoulder: {type: "number"},
      hip: {type: "number"},
    }
  },
  political: {
    type: "object",
    fields: {
      LR: {type: "number"},
      LA: {type: "number"},
    }
  },
  school: {type: "string"},
}
