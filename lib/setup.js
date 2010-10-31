//TODO Separate this logic and try to make it smarter , autoload based on files present etc

module.exports.setup = function(o){
  var sys = require("sys"),
      app = o.app,
      redis = o.redis,
      socket = o.app.socket,
      mongoose = o.mongoose,
      socket_provider = o.io,
      express = o.express;
  
  global.db = mongoose.connect("mongodb://localhost/db");

  mongoose.model('User', require("../app/models/user.js").definition() );
  global.User = db.model("User");


  app.configure(function(){
  	app.set('view engine','haml');
      app.set('views', __dirname + '/../app/views');
      app.use(express.bodyDecoder());
      app.use(express.methodOverride());
      app.use(express.compiler({ src: __dirname + '/../public', enable: ['less'] }));
      app.use(app.router);
      app.use(express.staticProvider(__dirname + '/../public'));
  });
  
  //routing and such
  var users_controller = require("../app/controllers/users_controller.js");
  app.get("/users", users_controller.index );
  app.get("/users/:id", users_controller.show );
  app.post("/users", users_controller.create );
  app.put("/users/update/:id", users_controller.update );

  app.get('/', function(req, res){
      res.render('index.haml');
  });

  // redis pub/sub with socket.io
  redis.subscribeTo("socket-io-broadcast",function(channel,message,pattern){
    var payload = JSON.stringify({
      'channel' : channel,
      'message' : message
    });
    
    app.socket.broadast(payload);
  });
  
  app.listen(o.port || 3000);
  app.socket = socket_provider.listen(app);
};