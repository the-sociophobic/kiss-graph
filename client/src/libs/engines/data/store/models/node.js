export default {
  id: {type: "id"},
  // type: {type: "select", options: [ //weeeeell it is partly supported by Cypher syntax
  //   "Person",
  //   "Label"
  // ], default: "Person"},

  name: {type: "string"},
  userName: {type: "string"}, //used as link if defined
  link: {type: "string", local: true},
  emoji: {type: "string"},

  connections: {type: "number", local: true},
  hiddenConnections: {type: "number"},
  mates: {type: "ref"},

  aka: {type: "array"},
}