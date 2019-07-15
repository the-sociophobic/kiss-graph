/**
 * Edge.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    node0: {
      collection: 'node',
      via: 'edgesOut'
    },
    node1: {
      collection: 'node',
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

