var shoppingItemsDb = require('../../app/db/shoppingItemsDb')
   , q = require('q');

describe('shoppingItemsDb', function() {
   beforeEach(function(done) {
      shoppingItemsDb.getAllItems().then(function(allItems) {
         q.all(allItems.map(function(item) {
            return shoppingItemsDb.deleteItem(item);
         })).then(function() {
            done();
         });
      });
   });

   describe('#addItem', function() {
      it('should be able to add items', function(done) {
         shoppingItemsDb.addItem({'foo': 'bar'}).then(function() {
            shoppingItemsDb.getAllItems().then(function(items) {
               expect(itms.length).to.equal(1);
               done();
            });
         });
      });
   });
});
