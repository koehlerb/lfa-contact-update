const crypto = require('crypto');
const request = require('request-promise-native');

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, data } = context;

    // Throw an error if we didn't get an email address or captcha
    if(!data.email || !data.captcha ) {
      throw new Error('An update must have an email and a captcha');
    }

    const emailParts = data.email.trim().split( "@" );
    if ( emailParts.length != 2 || emailParts[1] != 'langara.ca') {
      throw new Error('An update must have a valid email address');
    }
    const username = emailParts[0].trim();

    const result = await app.service( 'api/members' ).find( {
      query: {
        username,
        $limit: 1
      }
    });

    if ( result.length != 1 ) {
      throw new Error( 'No matching username' );
    }

    var body = await request.post( 'https://www.google.com/recaptcha/api/siteverify',
      {form: {
        secret: app.get( 'RECAPTCHA_API_KEY' ),
        response: data.captcha
//        response: "foo"
      }} );

    body = JSON.parse(body);
    if ( !body.success ) {
      throw new Error( 'Did not solve captcha');
    }

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      username,
      // Add update key
      updateKey: crypto.randomBytes( 16 ).toString( 'hex' ),
      // Add the current date
      createdAt: new Date().getTime()
    };

    const msg = {
      to: username + '@langara.ca',
      from: app.get( 'SENDGRID_SENDER' ),
      subject: 'LFA: Verify Contact information',
      text: 'Follow this link to view or update your '
            + 'LFA contact information: '
            + app.get( 'LFA_BASE_URL' )
            + '/update/'
            + context.data.updateKey
    };
    app.get( 'SGMAIL' ).send(msg);

    // Best practice: hooks should always return the context
    return context;
  };
};
