const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const sanitizeCreateEmailconfirm = require('../../src/hooks/sanitize-create-emailconfirm');

describe('\'sanitize-create-emailconfirm\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: sanitizeCreateEmailconfirm()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
