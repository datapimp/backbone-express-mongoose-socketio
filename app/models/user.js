var mongoose = require("mongoose");
var sys = require("sys");
var schema = new mongoose.Schema({
    name  :  { type: String, default: 'hahaha' }
  , age   :  { type: Number, min: 18, index: true }
  , bio   :  { type: String, match: /[a-z]/ }
  , date  :  { type: Date, default: Date.now }
 });

mongoose.model('User', schema); 

