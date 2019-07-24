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
      example: 15404731780,
      // example: 404465085,
      //https://www.instagram.com/oauth/authorize/?client_id=e4c0b09f2b8e47ec88ae28e20af1841e&redirect_uri=http://kiss-graph.com&response_type=token
      //404465085.e4c0b09.2c95b36c38fd4fb99ab273633a7e5f77
    },
    fbId: {
      type: 'number',
      example: 100001598940470,
    },


  },

};

