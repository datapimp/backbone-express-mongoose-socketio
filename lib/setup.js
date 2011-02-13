//TODO Separate this logic and try to make it smarter , autoload based on files present etc

module.exports.setup = function(o){
  var sys = require("sys"),
      app = o.app,
//      redis = o.redis,
      socket = o.app.socket,
      mongoose = o.mongoose,
      io = o.io,
      express = o.express;
  
  Server.paths = o.paths;
  
  global.db = mongoose.connect("mongodb://localhost/datapimp");
  
  require("./models.js").autoload(db);
  require("./controllers.js").autoload(app);
  require("./routes.js").draw(app);
  
  app.configure(function(){
  	app.set('view engine','haml');
    app.set('views', o.paths.views);
    app.use(express.bodyDecoder());
    app.use(express.methodOverride());
    app.use(express.compiler({ src: o.paths.root, enable: ['less'] }));
    app.use(app.router);
    app.use(express.staticProvider(o.paths.root));
  });
  
  app.listen(o.port || 3000);
  app.socket = io.listen(app);
/*
  // redis pub/sub with socket.io
  redis.subscribeTo("socket-io-broadcast:*",function(channel,message,pattern){
    var payload = JSON.stringify({
      'channel' : channel + '',
      'message' : message + ''
    });
    
    app.socket.broadcast(payload);
  });
*/  
  
};
