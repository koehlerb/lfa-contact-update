const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const populateEmailPhone = require('../../src/hooks/populate-email-phone');

describe('\'populate-email-phone\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: populateEmailPhone()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
