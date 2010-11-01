module.exports = Server.controllers = {};

Server.controllers.autoload = function(db){
  var fs = require("fs"),
      path = require("path"),
      files = fs.readdirSync( Server.paths.controllers ),
      names = _.map(files,function(f){
        return( path.basename(f) );
      });

  _.each(names,function(controller){
    require( Server.paths.controllers + "/" + controller );
  });
};