Application.socket = {
  provider : new io.Socket(),
  onConnect : function(){
  },
  onMessage : function(p){
    var message = JSON.parse(p),
        channel = message.channel.split(/\:/).pop(),
        data = message.message;
        
    if( data.match(/^\{|\[/) && data.match(/\}|\]$/) ){
      try {
        data = JSON.parse(data);
      } catch(err){
        data = message.message;
      }
    }
    
    if( Application.channels[channel] && typeof(Application.channels[channel]=="function") ){
      Application.channels[channel](data);
    }
  },
  onDisconnect : function(){
    setInterval(Application.socket.connect,300);
  },
  connect : function(){
    var s = Application.socket.provider;
    
    if(s.connected){
      return;
    }
    
    s.on("connect", Application.socket.onConnect );
    s.on("message", Application.socket.onMessage );
    s.on("disconnect", Application.socket.onDisconnect );
    
    s.connect();
  }
};