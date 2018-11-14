// creates a phone confirmation record and sends the SMS message

module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;

    // Throw an error if we didn't get a phone number or updateKey
    if(!data.phone || !data.updateKey ) {
      throw new Error('An phoneconfirm must have an phone and a update key');
    }

    const result = await app.service( 'api/updates' ).find( {
      query: {
        updateKey: data.updateKey,
        $limit: 1
      }
    });

    if ( result.length != 1 ) {
      throw new Error( 'No matching update key' );
    }

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      username: result[0].username,
      phone: data.phone,
      // Add the current date
      createdAt: new Date().getTime()
    };

    app.get( 'TWILIO' ).messages
          .create({
            from: app.get( 'TWILIO_NUMBER' ),
            body: 'Reply with 1 to confirm this is your LFA contact mobile phone number',
            to: '+1' + context.data.phone
          })
          .then(message => {})
          .done();

    // Best practice: hooks should always return the context
    return context;
  };
};
