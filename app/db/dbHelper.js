var DbHelper = function() {
   var username = 'shoppingList'
      , password = 'shoppingList'
      , defaultDbName = 'shoppingList'
      , server = 'localhost'
      , port = 27017;

   function defaultConnectionString() {
      return 'mongodb://' + username + ':' + password + '@' + server + ':' + port + '/' + db();
   }

   function db() {
      var dbName = defaultDbName;
      if (process.env.NODE_ENV) {
        dbName += '-' + process.env.NODE_ENV;
      }
      return dbName;
   };

   this.getConnectionString = function() {
      if (process.env.MONGOHQ_URL) {
         return process.env.MONGOHQ_URL;
      }

      return defaultConnectionString();
   };
}

module.exports = new DbHelper();

