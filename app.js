var express = require('express'),
  mongoose  = require("mongoose").Mongoose;
  redis     = require("redis-client").createClient(),
  io        = require("socket.io");
  app       = module.exports = express.createServer(),
  setup       = require("./lib/setup.js").setup({
    redis: redis,
    app: app,
    mongoose : mongoose
  });


app.configure(function(){
	app.set('view engine','haml');
    app.set('views', __dirname + '/app/views');
    app.use(express.bodyDecoder());
    app.use(express.methodOverride());
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(express.staticProvider(__dirname + '/public'));
});

app.get('/', function(req, res){
    res.render('index.haml');
});


if (!module.parent) {
    app.listen(3000);
    console.log("Express server listening on port %d", app.address().port)
}

var socket = io.listen(app);
