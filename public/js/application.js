var Application = {
    models: {},
    collections: {},
    util: {},
    channels: {}
};
Application.models.Project = Backbone.Model.extend({});
Application.collections.Projects = Backbone.Collection.extend({
    model: Application.models.Project
});
Application.socket = {
    provider: new io.Socket(),
    onConnect: function () {},
    onMessage: function (e) {
        var c = JSON.parse(e),
            b = c.channel.split(/\:/).pop(),
            d = c.message;
        if (d.match(/^\{|\[/) && d.match(/\}|\]$/)) {
            try {
                d = JSON.parse(d)
            } catch (a) {
                d = c.message
            }
        }
        if (Application.channels[b] && typeof (Application.channels[b] == "function")) {
            Application.channels[b](d)
        }
    },
    onDisconnect: function () {
        setInterval(Application.socket.connect, 300)
    },
    connect: function () {
        var a = Application.socket.provider;
        if (a.connected) {
            return
        }
        a.on("connect", Application.socket.onConnect);
        a.on("message", Application.socket.onMessage);
        a.on("disconnect", Application.socket.onDisconnect);
        a.connect()
    }
};
Application.channels.notifications = function (a) {
    console.log("Notification Channel Called", a)
};
Application.run = function () {
    Application.socket.connect()
};
$(function () {
    Application.run()
});