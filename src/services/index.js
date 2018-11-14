const members = require('./members/members-datastore.service.js');
const updates = require('./updates/updates-datastore.service.js');
const emailconfirms = require('./emailconfirms/emailconfirms-datastore.service.js');
const phoneconfirms = require('./phoneconfirms/phoneconfirms-datastore.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(members);
  app.configure(updates);
  app.configure(emailconfirms);
  app.configure(phoneconfirms);
};
