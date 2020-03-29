export default {
  id: {type: "id"},
  type: {type: "select", options: [
    "KISS",
    "SEX",
    "MARRIED",
    "FRIENDSHIP",
    "CHIVALRY",
    "STATE", //for connections with non-Persons (Labels)
  ], default: "KISS"},
  node0: {type: "ref"},
  node1: {type: "ref"},
  commited: {type: "date"},
  told: {type: "date"},
  published: {type: "date"},
  hidden: {type: "boolean"},
}