const assert = require('assert');
const app = require('../../src/app');

describe('\'phoneconfirms\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/phoneconfirms');

    assert.ok(service, 'Registered the service');
  });
});
