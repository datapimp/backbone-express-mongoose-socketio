var Application = {
  models : {},
  collections : {},
  util : {},
  channels : {}
};

//= require "application/models"
//= require "application/collections"
//= require "application/socket"

Application.run = function(){
  console.log('Running Application...');
  Application.socket.connect();
};

$(function(){
  Application.run();
});