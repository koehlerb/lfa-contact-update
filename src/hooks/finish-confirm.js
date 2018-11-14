// this copies the updated email address from the emailconfirms table to the
// members table

module.exports = function (options = {}) {
  return async context => {
    const { app, result } = context;

    const membersResult = await app.service( 'api/members' ).find( {
      query: {
        username: result[0].username,
        $limit: 1
      }
    });

    if ( membersResult.length != 1 ) {
      throw new Error( 'No matching username' );
    }

    membersResult[0].email = result[0].email;
    membersResult[0].lastChanged = new Date().getTime();

    const theId = membersResult[0].id;
    delete membersResult[0].id;

    app.service( 'api/members' ).update(
      theId,
      membersResult[0]
    );
    app.service( 'api/emailconfirms' ).remove( result[0].id );

    // Best practice: hooks should always return the context
    return context;
  };
};
