/**
 * Node.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      example: "Lev Vasilyev",
    },
    edgesOut: {
      collection: 'edge',
      via: 'node0'
    },
    edgesIn: {
      collection: 'edge',
      via: 'node1'
    },
    meta: {
      model: 'meta',
    },

  },

};

