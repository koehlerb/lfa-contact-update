const assert = require('assert');
const app = require('../../src/app');

describe('\'confirms\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/confirms');

    assert.ok(service, 'Registered the service');
  });
});
