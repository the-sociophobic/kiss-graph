/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    birthDate: {
      type: 'number',
      example: 1502844074211
    },

    node: {
      model: 'node',
    },

    socialNetworkProfiles: {
      collection: 'socialNetworkProfile',
      via: 'user',
    },

    submissions: {
      collection: 'edge',
      via: 'approvedBy',
    },

    usersLists: {
      model: 'usersList',
    },

    lastSeenAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment at which this user most recently interacted with the backend while logged in (or 0 if they have not interacted with the backend at all yet).',
      example: 1502844074211
    },
  },

};

