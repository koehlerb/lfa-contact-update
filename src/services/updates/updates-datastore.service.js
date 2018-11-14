// Initializes the `updates` service on path `/api/updates`
const createService = require('@koehlerb/feathers-datastore');
const hooks = require('./updates.hooks');

module.exports = function (app) {
  const kind = 'Updates';
  const projectId = process.env.DATASTORE_PROJECT_ID;

  const options = {
    kind,
    projectId
  }

  // Initialize our service with any options it requires
  app.use('/api/updates', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/updates');

  service.hooks(hooks);
};
