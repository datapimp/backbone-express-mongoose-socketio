var Server = {},
    express = require("express");

Server.setup = require("./lib/setup.js").setup({
  redis: require("redis-client").createClient(),
  app: express.createServer(),
  mongoose : require("mongoose").Mongoose,
  io : require("socket.io"),
  express : express,
  paths : {
    views :  __dirname + '/app/views',
    root : __dirname + '/public',
    controllers : __dirname + '/app/controllers',
    models : __dirname + '/app/models' 
  }
});