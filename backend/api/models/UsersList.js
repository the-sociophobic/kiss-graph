/**
 * UsersList.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    creator: {
      collection: 'user',
      via: 'usersLists',
    },
    name: {
      type: 'string',
      required: true,
    },
    users: {
      model: 'user',
    }
  },

};

