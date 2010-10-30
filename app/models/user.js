module.exports.definition = function(){
  return {
      properties: ['first_name', 'last_name', 'email', 'updated_at'],
      indexes: ['id'],
      getters: {
          full_name: function(){ 
              return this.first_name + ' ' + this.last_name;
          }
      },
      methods: {
          save: function(fn){
              this.updated_at = new Date();
              this.__super__(fn);
          }
      }
  };
}