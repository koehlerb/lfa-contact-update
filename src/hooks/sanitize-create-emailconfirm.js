// creates and email confirmation record and sends the email

const crypto = require('crypto');

module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;

    // Throw an error if we didn't get an email address or updateKey
    if(!data.email || !data.updateKey ) {
      throw new Error('An emailconfirm must have an email and a update key');
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
      email: data.email,
      // Add confirm key
      confirmKey: crypto.randomBytes( 16 ).toString( 'hex' ),
      // Add the current date
      createdAt: new Date().getTime()
    };

    const msg = {
      to: context.data.email,
      from: app.get( 'SENDGRID_SENDER' ),
      subject: 'LFA: Confirm Contact information',
      text: 'Follow this link to confirm your '
            + 'LFA contact information: '
            + app.get( 'LFA_BASE_URL' )
            + '/confirm/'
            + context.data.confirmKey
    };
    app.get( 'SGMAIL' ).send(msg);

    // Best practice: hooks should always return the context
    return context;
  };
};
