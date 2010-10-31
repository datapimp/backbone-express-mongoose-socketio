//TODO Separate this logic and try to make it smarter , autoload based on files present etc

module.exports.setup = function(o){
  var sys = require("sys");
  
  global.db = o.mongoose.connect("mongodb://localhost/db");

  o.mongoose.model('User', require("../app/models/user.js").definition() );
  global.User = db.model("User");
  
  //routing and such
  var users_controller = require("../app/controllers/users_controller.js");
  o.app.get("/users", users_controller.index );
  o.app.get("/users/:id", users_controller.show );
  o.app.post("/users", users_controller.create );
  o.app.put("/users/update/:id", users_controller.update );
  
  o.redis.subscribeTo("socket-io:*",function(channel,message,pattern){
    sys.puts("We got a redis subcription",message,channel);
  });
};