var shoppingItemsDb = require('../db/shoppingItemsDb')
   , changesDb = require('../db/changesDb')

var ShoppingItems = function() {
   this.index = function(request, response) {
      shoppingItemsDb.allItems(function(docs) {
         response.json(docs.map(function(doc) {
            return {
               id: doc._id,
               name: doc.name,
               checked: doc.checked
            };
         }));
      });
   };

   this.post = function(request, response) {
      var item = {
         name: request.body.name,
         checked: 0
      };

      shoppingItemsDb.addItem(item, function(itemInDb) {
         var change = {
            itemId: itemInDb._id,
            name: itemInDb.name,
            changeType: 0
         };
         changesDb.addChange(change, function() {
            response.status(201);
            response.end();
         });
      });
   };

   this.delete = function(request, response) {
      var id = request.params.id;

      shoppingItemsDb.deleteItem(id, function() {
         var change = {
            itemId: id,
            changeType: 1
         };
         changesDb.addChange(change, function() {
            response.status(201);
            response.end();
         });
      });
   };

   this.put = function(request, response) {
      var id = request.params.id;
      var isChecked = request.body.checked == 'true';

      shoppingItemsDb.markItem(id, isChecked, function(docs) {
         var change = {
            itemId: id,
            changeType: isChecked ? 2 : 3
         };

         changesDb.addChange(change, function() {
            response.status(201);
            response.end();
         });
      });
   };
}

module.exports = new ShoppingItems();

