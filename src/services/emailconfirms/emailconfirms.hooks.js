

const sanitizeCreateEmailconfirm = require('../../hooks/sanitize-create-emailconfirm');

const finishConfirm = require('../../hooks/finish-confirm');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [sanitizeCreateEmailconfirm()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [finishConfirm()],
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
