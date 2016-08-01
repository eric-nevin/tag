var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/static')));
app.use(bodyParser.urlencoded({extended: true}));

var server = app.listen(8000, function(){
    console.log('cool stuff on: 8000');
});

var io = require('socket.io').listen(server);
var apple = "hey";
io.sockets.on('connection', function(socket){
    console.log("WE ARE USING SOCKETS!");
    console.log(socket.id);
    socket.on("update", function(data){
        socket.broadcast.emit('update_response', data);
    })
    socket.on('disconnect',function(){
        socket.broadcast.emit('delete_user');
    })
})




