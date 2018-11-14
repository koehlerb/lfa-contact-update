// Initializes the `emailconfirms` service on path `/api/emailconfirms`
const createService = require('@koehlerb/feathers-datastore');
const hooks = require('./emailconfirms.hooks');

module.exports = function (app) {
  const kind = 'Emailconfirms';
  const projectId = process.env.DATASTORE_PROJECT_ID;

  const options = {
    kind,
    projectId
  }

  // Initialize our service with any options it requires
  app.use('/api/emailconfirms', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/emailconfirms');

  service.hooks(hooks);
};
