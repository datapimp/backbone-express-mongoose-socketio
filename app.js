require("./lib/underscore");

var Server = {},
    express = require("express"),
    application_root = __dirname;

global.Server = Server;
Server.root = application_root;

Server.setup = require("./lib/setup.js").setup({
  redis: require("redis-client").createClient(),
  app: express.createServer(),
  mongoose : require("mongoose").Mongoose,
  io : require("socket.io"),
  express : express,
  paths : {
    views :  application_root + '/app/views',
    root : application_root + '/public',
    controllers : application_root + '/app/controllers',
    models : application_root + '/app/models' 
  }
});