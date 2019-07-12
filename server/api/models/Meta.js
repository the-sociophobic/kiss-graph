/**
 * Meta.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    node: {
      model: 'node',
      required: true,
    },

    connections: {
      type: 'number',
      example: 25,
    },

    avatar: {
      type: 'string',
      example: 'https://pp.userapi.com//c850428//v850428812//aa603//qAjRqo_okCg.jpg?ava=1',
    },
    
    dateOfBirth: {
      type: 'number',
    },
    realName: {
      type: 'string',
      example: 'Васильев Лев Игоревич',
    },

    vkId: {
      type: 'number',
      example: 11879299,
    },
    instId: {
      type: 'number',
      example: 404465085,
    },
    fbId: {
      type: 'number',
      example: 100001598940470,
    },


  },

};

