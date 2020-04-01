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
      fb2: {type: "string"},
      steam: {type: "string"},
      ticktok: {type: "string"},
    }
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