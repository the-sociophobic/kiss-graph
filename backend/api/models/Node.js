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
      example: 'that guy from 2017',
    },
    user: {
      collection: 'user',
      via: 'node',
    },
    edges: {
      collection: 'edge',
      via: 'nodes',
    },

    X: {
      type: 'number',
      defaultsTo: 0,
    },
    Y: {
      type: 'number',
      defaultsTo: 0,
    },
    Z: {
      type: 'number',
      defaultsTo: 0,
    },
  },

};

