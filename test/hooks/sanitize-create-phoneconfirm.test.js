const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const sanitizeCreatePhoneconfirm = require('../../src/hooks/sanitize-create-phoneconfirm');

describe('\'sanitize-create-phoneconfirm\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: sanitizeCreatePhoneconfirm()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
