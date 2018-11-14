// Initializes the `members` service on path `/api/members`
const createService = require('@koehlerb/feathers-datastore');
const hooks = require('./members.hooks');

module.exports = function (app) {
  const kind = 'Members';
  const projectId = process.env.DATASTORE_PROJECT_ID;

  const options = {
    kind,
    projectId
  }

  // Initialize our service with any options it requires
  app.use('/api/members', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/members');

  service.hooks(hooks);
};
