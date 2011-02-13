/*
  TODO: This is quick and dirty, should obviously refactor the hell out of this
*/

var match = function(url,handler,method){
  handler = handler || "site#index";
  
  var parts = handler.split(/\#/),
      util = require("./util"),
      controller = parts.shift(),
      action = parts.shift(),
      sys = require('sys'),
      method = method || "get";

  //sys.puts(sys.inspect(controller));
  
  if(!controller.match(/_controller$/)){
    if (controller == 'site') {
        controller = 'Index';
    }
    controller = controller + "Controller";
  }
  
  sys.puts(sys.inspect(Server.controllers.controller_objects));
  sys.puts(sys.inspect(controller));

  var controller_id = util.camelize(controller),
      action_handler = Server.controllers.controller_objects[controller][ action ];
  
  //add the handler for the url
  if(url && action_handler){
    app[method](url,action_handler);
  }
};

var resource = function(resource_name){

};

module.exports.draw = function(app){
  match("/")
};
