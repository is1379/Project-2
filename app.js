let express = require('express');
let io = require('socket.io');
let http = require('http');


let socketServer = express();
socketServer.use('/', express.static('public')); 
let server = http.createServer(socketServer);
io = new io.Server(server);

io.sockets.on('connection', function(socket) {

    socket.on('data', function(data) {
        socket.broadcast.emit('data', data);
    });

    socket.on('disconnect', function() {
        console.log(socket.id + " has disconnected from the page");
    });
});

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});