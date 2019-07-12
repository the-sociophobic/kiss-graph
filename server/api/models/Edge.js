/**
 * Edge.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    node0: {
      collection: 'edge',
      via: 'edgesOut'
    },
    node1: {
      collection: 'edge',
      via: 'edgesIn'
    },

    type: {
      type: 'string',
      defaultsTo: 'kiss',
    },

    date: {
      type: 'number',
    },

    hidden: {
      type: 'boolean',
      defaultsTo: false,
    }

  },

};

