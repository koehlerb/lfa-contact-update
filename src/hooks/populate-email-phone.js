// this fills in the email and phone for and update from the members
// service

module.exports = function (options = {}) {
  return async context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;

    // Make sure that we always have a list of messages either by wrapping
    // a single message into an array or by getting the `data` from the `find` method result
    //const messages = method === 'find' ? result.data : [ result ];
    const updates = method === 'find' ? result : [ result ];

    // Asynchronously get user object from each messages `userId`
    // and add it to the message
    await Promise.all(updates.map(async update => {
      // We'll also pass the original `params` to the service call
      // so that it has the same information available (e.g. who is requesting it)
      const member = await app.service('api/members').find({
        query: {
          username: update.username,
          $limit: 1
        }
      });

      if ( member.length != 1 ) {
        throw new Error( 'No matching username' );
      }

      update.email = member[0].email;
      update.phone = member[0].phone;
    }));

    // Best practise, hooks should always return the context
    return context;
  };
};
