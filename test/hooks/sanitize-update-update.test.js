const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const sanitizeUpdateUpdate = require('../../src/hooks/sanitize-update-update');

describe('\'sanitizeUpdateUpdate\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: sanitizeUpdateUpdate()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
