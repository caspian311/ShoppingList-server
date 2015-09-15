var ObjectID = require('mongodb').ObjectID
   , base = require('./base')
   , q = require('q');

var ShoppingItems = function() {
   var collection = function(db) {
      return db.collection('shoppingItems');
   }

   this.addItem = function(item) {
      var deferred = q.defer();
      base.inConnection(function(db) {
         collection(db).insert(item, function(err, addedItems) {
            if (err) {
               deferred.reject(err);
            }

            deferred.resolve(addedItems[0]);
         });
      });
      return deferred.promise;
   };

   this.getAllItems = function() {
      var deferred = q.defer();
      base.inConnection(function(db) {
         collection(db).find({}).toArray(function(err, docs) {
            if (err) {
               deferred.reject(err);
            }

            deferred.resolve(docs);
         });
      });
      return deferred.promise;
   };

   this.deleteItem = function(id, callback) {
      var deferred = q.defer();
      base.inConnection(function(db) {
         collection(db).remove({ '_id': ObjectID(id) }, function(err) {
            if (err) {
               deferred.reject(err);
            }

            deferred.resolve();
         });
      });
      return deferred.promise;
   };
};

module.exports = new ShoppingItems();

