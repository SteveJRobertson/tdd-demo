# Test-Driven Development Demo

This is a very straightforward example of how to use test-driven development in your code.

## Setup

Run `npm install` to install all dependencies, then `npm test` to run the Jasmine tests.

## Introduction

A user story has the following scenarios for verifying that a user has the correct permissions to access an admin system:

1. Authorised admin users should be allowed to access the system.
2. Users without admin permissions should not be allowed to access. An error message should be displayed stating "You do not have admin rights to this system".
3. Any user not recognised shall not be allowed access and an error message should be displayed stating "User details not recognised".

## Structuring our spec file

To get started we should break down the ACs for our first set of tests. To keep things simple we will only be concerned with the output of the method at first.

### ./spec/userDetailsSpec.js

```js
var userDetails = require( '../app/userDetails' );

describe( 'verify user details', function () {

  describe( 'when a user is an authorised admin user', function () {

    it( 'allows access to the system' );

    } );

  describe('when a user IS NOT an authorised admin user', function () {

    it( 'DOES NOT allow access to the system' );

  } );

  describe( 'when a user is not recognised', function () {

    it( 'DOES NOT allow access to the system' );

  } );

} );
```

The first line requires the module to be tested, in this case it will be found at ./app/userDetails.js.

The first describe() method is the name of the method being tested. There is a subsequent describe() method for each of the scenarios from the user story. Under each of these are a number of it() methods. It is here where our tests will go.

## Writing our first test

Now it's time to write our first test. We want to make sure that the method returns true for an authorised admin user.

### ./spec/userDetailsSpec.js

```js
var userDetails = require( '../app/userDetails' );

describe( 'verify user details', function () {

  describe( 'when a user is an authorised admin user', function () {

    it( 'allows access to the system', function () {
      var username = 'batman';

      expect( userDetails.verifyUserDetails( username ) ).toBe( true );
    } );

  } );

  describe('when a user IS NOT an authorised admin user', function () {

    it( 'DOES NOT allow access to the system' );

  } );

  describe( 'when a user is not recognised', function () {

    it( 'DOES NOT allow access to the system' );

  } );

} );

```

Running this test will throw the error: `Error: Cannot find module '../app/userDetails'` as we haven't created our module yet. We should create the skeleton code for our module now.

### ./app/userDetails.js

```js
module.exports = {

};
```

If we re-run our test now we will see it still fails, but a different error is shown: `TypeError: userDetails.verifyUserDetails is not a function`.

We should now create our `verifyUserDetails()` method inside our module.

### ./app/userDetails.js

```js
module.exports = {

    verifyUserDetails: function () {

    },

};
```

Running the tests once more we will see yet another different error message: `Expected undefined to be true`.

We should now be able to make our test pass by adding a return value to the method we just created.

### ./app/userDetails.js

```js
module.exports = {

    verifyUserDetails: function () {
      return true;
    },

}:
```

Our test now passes!

## Adding further tests

Moving on to our next scenario, we now need verification to fail whenever a user does not have admin rights.

### ./spec/userDetailsSpec.js

```js
var userDetails = require( '../app/userDetails' );

describe( 'verify user details', function () {

    describe( 'when a user is an authorised admin user', function () {

      it( 'allows access to the system', function () {
        var username = 'batman';

        expect( userDetails.verifyUserDetails( username ) ).toBe( true );
      } );

    } );

    describe( 'when a user IS NOT an authorised admin user', function () {

        it( 'DOES NOT allow access to the system', function () {
            var username = 'robin';

            expect( userDetails.verifyUserDetails( username ) ).toBe( false );
        } );

    } );

    describe( 'when a user is not recognised', function () {

        it( 'DOES NOT allow access to the system' );

    } );

} );
```

We now get an error on the second test: Expected true to be false. Now to get our second test passing.

### ./app/userDetails.js

Here we pass in a username parameter. We also add a switch statement to return true if the username is 'batman' and false if the username is 'robin'. The tests now pass.

Obviously this method isn't much use in the real world at the moment, but remember we're writing the bare minimum code required in order for our tests to pass.

Now we have to write a test for the third scenario where a user is not recognised.

### ./spec/userDetailsSpec.js

```js
var userDetails = require( '../app/userDetails' );

describe( 'verify user details', function () {

    describe( 'when a user is an authorised admin user', function () {

      it( 'allows access to the system', function () {
        var username = 'batman';

        expect( userDetails.verifyUserDetails( username ) ).toBe( true );
      } );

    } );

    describe( 'when a user IS NOT an authorised admin user', function () {

        it( 'DOES NOT allow access to the system', function () {
            var username = 'robin';

            expect( userDetails.verifyUserDetails( username ) ).toBe( false );
        } );

    } );

    describe( 'when a user is not recognised', function () {

        it( 'DOES NOT allow access to the system', function () {
            var username = 'joker';

            expect( userDetails.verifyUserDetails( username ) ).toBe( false );
        } );

    } );

} );
```

We will see, as expected that the third test has failed. We can fix this quite easily in our module.

### ./app/userDetails.js

```js
module.exports = {

    verifyUserDetails: function ( username ) {
        switch( username ) {
            case 'batman':
                return true;
            default:
                return false;
        }
    },

};
```

Now only the username 'batman' will return true and all the tests will pass.

In a real world situation we will probably have some more robust way of checking if 'batman' is an authorised admin user. Checking the user details should probably be handled by a call to another method. Rather than concerning ourselves with other functionality at this stage, we can use a Jasmine spy to mock the other method and return the expected response. Imagine that we need a different response for each scenario; 1 for a valid admin user, 0 for an invalid admin user and -1 for a user not found.

We should also add new tests to make it clear that a new method is being called.

Our spec file can now be amended as follows.

### ./spec/userDetailsSpec.js

```js
var userDetails = require( '../app/userDetails' );

describe( 'verify user details', function () {

    beforeEach( function () {
        spyOn( userDetails, 'checkUserDetails' ).and.returnValue( 1 );
    } );

    describe( 'when a user is an authorised admin user', function () {

        it( 'checks the user permissions' );

        it( 'allows access to the system', function () {
            var username = 'batman';

            expect( userDetails.verifyUserDetails( username ) ).toBe( true );
        } );

    } );

    describe( 'when a user IS NOT an authorised admin user', function () {

        it( 'checks the user permissions' );

        it( 'DOES NOT allow access to the system', function () {
            var username = 'robin';

            expect( userDetails.verifyUserDetails( username ) ).toBe( false );
        } );

    } );

    describe( 'when a user is not recognised', function () {

        it( 'checks the user permissions' );

        it( 'DOES NOT allow access to the system', function () {
            var username = 'joker';

            expect( userDetails.verifyUserDetails( username ) ).toBe( false );
        } );
 
    } );
 
} );
```

If we run our tests now they will all fail with the error: `Error: <spyOn> : checkUserDetails() method does not exist`.

All we need to do at this stage is add an empty `checkUserDetails()` method to the module. Remember that we aren't concerned about the functionality inside that method at this stage.

### ./app/userDetails.js

```js
module.exports = {

    checkUserDetails: function () {},

    verifyUserDetails: function ( username ) {
        switch( username ) {
            case 'batman':
                return true;
            default:
                return false;
        }
    },

};
```

When running our tests again we will see that they all pass once more.

We should now turn our attention back to our first scenario.

### ./spec/userDetailsSpec.js

```js
var userDetails = require( '../app/userDetails' );
 
describe( 'verify user details', function () {

    beforeEach( function () {
        spyOn( userDetails, 'checkUserDetails' ).and.returnValue( 1 );
    } );

    describe( 'when a user is an authorised admin user', function () {

        beforeEach( function() {
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

    ...

```

Running our tests again will show the following error for our new test: `Expected spy checkUserDetails to have been called with [ 'batman' ] but it was never called`. We now need to call this in our module's method.

### ./app/userDetails.js

```js
module.exports = {

    checkUserDetails: function () {},

    verifyUserDetails: function ( username ) {
        var response = this.checkUserDetails( username );

        switch( username ) {
            case 'batman':
                return true;
            default:
                return false;
        }
    },

};
```

Our tests now pass again. Now we need to use the response in the switch statement.

### ./app/userDetails.js

```js
module.exports = {

    checkUserDetails: function () {},

    verifyUserDetails: function ( username ) {
        var response = this.checkUserDetails( username );

        switch( response ) {
            case 1:
                return true;
            default:
                return false;
        }
    },

};
```

We now have two failing tests as the spy `checkUserDetails()` always returns 1. We should update our spec file. In the top `beforeEach()` method, we should simply declare the spy. We can now call the spy in the other `beforeEach()` methods and assign a return value.

### ./spec/userDetailsSpec.js

```js
var userDetails = require( '../app/userDetails' );

describe( 'verify user details', function () {

    beforeEach( function () {
        spyOn( userDetails, 'checkUserDetails' );
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

        it( 'DOES NOT allow access to the system', function () {
            expect( this.userVerified ).toBe( false );
        } );

    } );

} );

```

We have slotted in two more tests to check user permissions for the other two scenarios while also refactoring the verify user tests. We now have 6 unit tests all passing.

Lastly we need to add tests to enable error handling for scenarios 2 and 3.

Let's assume that the action of displaying the error message is handled by another method which we pass the error message to. We will call this method `displayErrorMessage()`. Firstly we need to create another spy in the spec file.

### ./spec/userDetailsSpec.js

```js
var userDetails = require( '../app/userDetails' );

describe( 'verify user details', function () {

    beforeEach( function () {
        spyOn( userDetails, 'checkUserDetails' );
        spyOn( userDetails, 'displayErrorMessage' );
    } );

    ...

```

Obviously this will throw an error unless we write an empty method in the module file.

### ./app/userDetails.js

```js
module.exports = {

    checkUserDetails: function () {},

    displayErrorMessage: function () {},

    verifyUserDetails: function ( username ) {
        var response = this.checkUserDetails( username );

        switch( response ) {
            case 1:
                return true;
            default:
                return false;
        }
    },

};
```

The tests will now pass, but we should probably do a little refactoring here before we write our new tests.

If you look at the code in `./app/userDetails.js` you can see we're using a switch statement to handle the response from `checkUserDetails()` but this does not currently allow us to specify different error messages if the response is not 1.

The switch statement could be updated to handle different responses, however each other response would have to return false and we would also probably still need the default condition at the bottom, which is not part of the user story and would require us to write more tests.

Instead we can return a variable which is initially set to false and only changes to true if the response is 1. We are then free to add further conditions to handle the error messages.

### ./app/userDetails.js

```js
module.exports = {

    checkUserDetails: function () {},

    displayErrorMessage: function () {},

    verifyUserDetails: function ( username ) {
        var userVerified = false;
        var response = this.checkUserDetails( username );

        if( response === 1 ) {
            userVerified = true;
        }

        return userVerified;
    },

};
```

If we run our tests again they should all still pass after the refactoring is complete. Now we should write our two new tests for handling the errors.

### ./spec/userDetailsSpec.js

```js

    ...

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
```

We will now have two failing tests, so time to update our code.

### ./app/userDetails.js

```js
module.exports = {

    checkUserDetails: function () {},

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
    },

};
```

All of our tests now pass and our method is complete.
