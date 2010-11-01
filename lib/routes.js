var resource = function(resource_name){
  
};

module.exports.draw = function(app){
  app.get("/", function(request,response){
    response.render("index.haml");
  });
};