const assert = require('assert');
const app = require('../../src/app');

describe('\'emailconfirms\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/emailconfirms');

    assert.ok(service, 'Registered the service');
  });
});
