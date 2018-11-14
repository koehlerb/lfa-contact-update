

const sanitizeCreateUpdate = require('../../hooks/sanitize-create-update');

const populateEmailPhone = require('../../hooks/populate-email-phone');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [sanitizeCreateUpdate()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [populateEmailPhone()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
