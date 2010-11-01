module.exports.draw = function(app){
  app.get("/", function(request,response){
    response.render("index.haml");
  });
};