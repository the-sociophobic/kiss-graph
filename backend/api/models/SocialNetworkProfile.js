/**
 * SocialNetworkProfile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'user',
      required: true,
    },

    socialNetwork: {
      type: 'string',
      required: true,
    },
    userID: {
      type: 'string',
    },
    link: {
      type: 'string'
    },
  },

};

