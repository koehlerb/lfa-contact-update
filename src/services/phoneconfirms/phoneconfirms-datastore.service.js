// Initializes the `phoneconfirms` service on path `/api/phoneconfirms`
const createService = require('@koehlerb/feathers-datastore');
const hooks = require('./phoneconfirms.hooks');

module.exports = function (app) {
  const kind = 'Phoneconfirms';
  const projectId = process.env.DATASTORE_PROJECT_ID;

  const options = {
    kind,
    projectId
  }

  // Initialize our service with any options it requires
  app.use('/api/phoneconfirms', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/phoneconfirms');

  service.hooks(hooks);
};
