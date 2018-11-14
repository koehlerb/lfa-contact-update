// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, params, id, data } = context;

    // if the service is called internally, we'll just let it pass
    if ( params.provider === undefined ) {
      return context;
    }

    switch ( context.path ) {
      case 'api/emailconfirms':
        switch ( context.method ) {
          case 'create':
            break;
          case 'find':
            if ( params.query.$limit != 1 ) {
              throw new Error( '$limit must be 1 for find on api/emailconfirms' );
            }
            break;
          default:
            throw new Error( 'REST access not permitted to service: ' +
                              context.path +
                              ': ' + context.method
            );
            break;
        }
        break;

      case 'api/phoneconfirms':
        switch ( context.method ) {
          case 'create':
            break;
          default:
            throw new Error( 'REST access not permitted to service: ' +
                              context.path +
                              ': ' + context.method
            );
            break;
        }
        break;

      case 'api/updates':
        switch ( context.method ) {
          case 'create':
            break;
          case 'find':
            if ( params.query.$limit != 1 ) {
              throw new Error( '$limit must be 1 for find on api/updates' );
            }
            break;
          default:
            throw new Error( 'REST access not permitted to service: ' +
                              context.path +
                              ': ' + context.method
            );
            break;
        }
        break;

      default:
        throw new Error( 'REST access not permitted to service: ' +
                          context.path +
                          ': ' + context.method
        );
        break;
    }

    // Best practice: hooks should always return the context
    return context;
  };
};
