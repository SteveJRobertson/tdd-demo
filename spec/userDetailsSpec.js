var userDetails = require( '../app/userDetails' );

describe( 'verify user details', function () {
	
	beforeEach( function () {
        spyOn( userDetails, 'checkUserDetails' );
        spyOn( userDetails, 'displayErrorMessage' );
	} );

	describe( 'when a user is an authorised admin user', function () {
		
		beforeEach( function() {
			userDetails.checkUserDetails.and.returnValue( 1 );

			this.username = 'batman';
			this.userVerified = userDetails.verifyUserDetails( this.username );
		} );

		it( 'checks the user permissions', function () {
			expect( userDetails.checkUserDetails ).toHaveBeenCalledWith( 'batman' );
		} );

		it( 'allows access to the system', function () {
			expect( this.userVerified ).toBe( true );
		} );

	} );

	describe( 'when a user IS NOT an authorised admin user', function () {

        beforeEach( function() {
			userDetails.checkUserDetails.and.returnValue( 0 );

			this.username = 'robin';
			this.userVerified = userDetails.verifyUserDetails( this.username );
		} );

		it( 'checks the user permissions', function () {
			expect( userDetails.checkUserDetails ).toHaveBeenCalledWith( 'robin' );
		} );

		it( 'displays an error message', function () {
			expect( userDetails.displayErrorMessage ).toHaveBeenCalledWith( 'You do not have admin rights to this system' );
		} );

		it( 'DOES NOT allow access to the system', function () {
            expect( this.userVerified ).toBe( false );
        } );

    } );

    describe( 'when a user is not recognised', function () {

        beforeEach( function() {
			userDetails.checkUserDetails.and.returnValue( -1 );

			this.username = 'joker';
			this.userVerified = userDetails.verifyUserDetails( this.username );
		} );

		it( 'checks the user permissions', function () {
			expect( userDetails.checkUserDetails ).toHaveBeenCalledWith( 'joker' );
		} );

		it( 'displays an error message', function () {
			expect( userDetails.displayErrorMessage ).toHaveBeenCalledWith( 'User details not recognised' );
		} );

		it( 'DOES NOT allow access to the system', function () {
            expect( this.userVerified ).toBe( false );
        } );

    } );

} );
