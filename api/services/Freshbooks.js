/**
 * Freshbooks.js
 *
 * @description :: Freshbooks Wrapper
 * @docs        :: http://sailsjs.org/#!documentation/services
 */

var FreshbooksApi = require("freshbooks-node");

module.exports = {
  api: function() {
    return new FreshbooksApi(
      sails.config.freshbooks.login, sails.config.freshbooks.apiKey, sails.config.freshbooks.appName
    );
  }
};
