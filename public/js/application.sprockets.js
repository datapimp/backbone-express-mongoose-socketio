var Application = {
  models : {},
  collections : {},
  util : {},
  channels : {}
};

// these files get pulled in from sprockets

// where I configure the backbone models / collections
//= require "application/models"
//= require "application/collections"

// where I define general behavior of the socket
//= require "application/socket"

// where I define specific behavior for various channels on the socket
//= require "application/channels"

Application.run = function(){
  Application.socket.connect();
};

// when the remmy is in the system
$(function(){
  Application.run();
});