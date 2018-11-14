const assert = require('assert');
const app = require('../../src/app');

describe('\'updates\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/updates');

    assert.ok(service, 'Registered the service');
  });
});
