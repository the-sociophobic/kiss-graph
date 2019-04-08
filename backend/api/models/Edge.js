/**
 * Edge.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nodes: {
      collection: 'node',
      via: 'edges'
    },

    approvedBy: {
      collection: 'user',
      via: 'submissions',
    },

    friends: {
      type: 'number',
      description: 'became friends on JS date',
    },
    kissed: {
      type: 'number',
      description: 'kissed on JS date. IMPORTANT!!!: different date is different entry',
    },
    sex: {
      type: 'number',
      description: 'had sex on JS date',
    },

    visibility: {
      model: 'visibility',
    },
  },

};

