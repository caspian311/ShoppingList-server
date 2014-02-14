(function() {
   var express = require('express')
      , http = require('http')
      , shoppingItems = require('./app/shoppingItems')
      , changes = require('./app/changes')

   var app = express()

   app.use(express.logger('dev'))
   app.use(express.bodyParser())
   app.use(express.methodOverride())

   app.use(shoppingItems)
   app.use(changes)

   http.createServer(app).listen(3000, function(){
     console.log("Express server listening on port 3000")
   });
})();
