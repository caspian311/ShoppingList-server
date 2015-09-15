var dbHelper = require('../../app/db/dbHelper');

describe('dbHelper', function() {
   describe('#getConnectionString', function() {
      it('should return a local connection', function() {
         var conn = dbHelper.getConnectionString();

         expect(conn).to.equal('mongodb://shoppingList:shoppingList@localhost:27017/shoppingList');
      });

      describe('when a node environment is specified', function() {
         var origNodeEnv;

         beforeEach(function() {
            origNodeEnv = process.env['NODE_ENV'];
         });

         afterEach(function() {
            process.env['NODE_ENV'] = origNodeEnv;
         });

         it('should return node environment suffix on db name', function() {
            process.env['NODE_ENV'] = 'monkey';

            var conn = dbHelper.getConnectionString();

            expect(conn).to.equal('mongodb://shoppingList:shoppingList@localhost:27017/shoppingList-monkey');
         });
      });

      describe('when in production', function() {
         afterEach(function() {
            process.env.MONGOHQ_URL = '';
         });

         it('should return node environment suffix on db name', function() {
            process.env.MONGOHQ_URL = 'im a little teapot';

            var conn = dbHelper.getConnectionString();

            expect(conn).to.equal('im a little teapot');
         });
      });
   });
});
