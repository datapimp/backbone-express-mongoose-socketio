var actions = {};

actions.index = function(request,response){
  User.find().all(function(users){
    response.send({
      results :  users,
      total : users.length
    })
  });
};

module.exports = actions;