const sails = require('sails');
const sinon = require('sinon');
const chai = require('chai');


before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift({
    // Your Sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    log: {
      level: 'silent'
    },
    hooks: {
      grunt: false
    },
    models: {
      connection: 'unitTestConnection',
      migrate: 'drop'
    },
    datastores: {
      unitTestConnection: {
        adapter: 'sails-disk'
      }
    }
  }, (err) => {
    if (err) { return done(err); }

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)

    return done();
  });
});

// After all tests have finished...
after((done) => {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});
