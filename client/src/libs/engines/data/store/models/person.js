import node from './node'

export default {
  ...node,
  uv: {type: "number", local: true},
  social: {
    type: "object",
    fields: {
      tg: {type: "string"},
      vk: {type: "string"},
      vk2: {type: "string"},
      inst: {type: "string"},
      inst2: {type: "string"},
      twit: {type: "string"},
      yt: {type: "string"},
      fb: {type: "string"},
      steam: {type: "string"},
    }
  },
  pos: {type: "point3d"},
  iq: {type: "number", canBeString: true},
  iq2: {type: "number", canBeString: true},
  mentalDisorder: {type: "string"},
  male: {type: "boolean"},
  dead: {type: "boolean"},
  offended: {type: "boolean"},
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
}