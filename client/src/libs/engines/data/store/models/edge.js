export default {
  id: {type: "id"},
  type: {type: "select", options: [
    "KISS",
    "SEX",
    "MARRIED",
    "FRIENDSHIP",
    "CHIVALRY",
    "ILLNESS",
    "STATE", //for unsorted labels
  ], default: "KISS"},
  node0: {type: "ref"},
  node1: {type: "ref"},
  commited: {type: "date"},
  told: {type: "date"},
  published: {type: "date"},
  hidden: {type: "boolean"},
}