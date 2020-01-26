export default {
  id: {type: "id"},
  name: {type: "string"},
  userName: {type: "string"},
  link: {type: "string", local: true},
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
    }
  },
  pos: {type: "point3d"},
  connections: {type: "number", local: true},
  hiddenConnections: {type: "number"},
  mates: {type: "ref"},
  iq: {type: "string"},
  iq2: {type: "string"},
  mentalDisorder: {type: "string"},
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
  aka: {type: "array"},
}