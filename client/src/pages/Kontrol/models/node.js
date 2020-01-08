const model = {
  id: 0,
  name: "",
  userName: "",
  social: {},
  pos: {},
  hiddenConnections: 0,
  iq: undefined,
  mentalDisorder: undefined,
  dead: false,
  offended: false,
  //experimental
  SHR: {},
  political: {},
  aka: [],
}


const editableFields = {
  name: "",
  userName: undefined,
  social: {
    tg: undefined,
    vk: undefined,
    inst: undefined,
    twit: undefined,
    yt: undefined,
    fb: undefined,
  },
  pos: {
    x: 0,
    y: 0,
    z: 0,
  },
  hiddenConnections: 0,
  iq: undefined,
  mentalDisorder: undefined,
  dead: false,
  offended: false,
}


export {
  model,
  editableFields,
}