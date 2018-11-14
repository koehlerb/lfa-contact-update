const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const finishConfirm = require('../../src/hooks/finish-confirm');

describe('\'finishConfirm\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: finishConfirm()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
