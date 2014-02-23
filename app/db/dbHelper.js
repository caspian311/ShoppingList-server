var DbHelper = function() {
   var db = function() {
      var dbName = 'shoppingList';

      if (process.env.NODE_ENV) {
        dbName = dbName + '-' + process.env.NODE_ENV;
      }
      return dbName;
   };

   this.getConnectionString = function() {
      if (process.env.MONGOHQ_URL) {
         return process.env.MONGOHQ_URL;
      } else {
         return 'mongodb://localhost:27017/' + db();
      }
   };
}

module.exports = new DbHelper();

