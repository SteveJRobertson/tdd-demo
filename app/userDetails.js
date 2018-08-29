module.exports = {

    checkUserDetails: function() {},

    displayErrorMessage: function () {},

    verifyUserDetails: function ( username ) {
        var userVerified = false;
		var response = this.checkUserDetails( username );
		
		if( response === 1 ) {
			userVerified = true;
		} else if( response === 0 ) {
			this.displayErrorMessage( 'You do not have admin rights to this system' );
		} else if( response === -1 ) {
			this.displayErrorMessage( 'User details not recognised' );
		}

		return userVerified;
    }

};
