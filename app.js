(function() {
   var express = require('express')
      , path = require('path')
      , http = require('http')
      , shoppingItems = require('./app/shoppingItems')

   var app = express()

   app.use(express.logger('dev'))
   app.use(express.bodyParser())
   app.use(express.methodOverride())

   app.use(express.static(path.join(__dirname, 'public')))
   app.use(shoppingItems)

   var port = Number(process.env.PORT || 3000)
   http.createServer(app).listen(port, function(){
     console.log('Express server listening on port ' + port)
   });
})();
