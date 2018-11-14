

const sanitizeCreatePhoneconfirm = require('../../hooks/sanitize-create-phoneconfirm');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [sanitizeCreatePhoneconfirm()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
