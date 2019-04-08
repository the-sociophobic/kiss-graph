/**
 * Visibility.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    creator: {
      model: 'user',
      required: true,
    },
    visibleTo: {
      type: 'string',
      defaultsTo: 'everyone',
      example: 'me/friends/edges/everyone/specific/lists',
    },

    specificUsers: {
      model: 'user',
    },
    usersLists: {
      model: 'usersList',
    }
  },

};

