var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

server.listen(8000);
console.log('server listening on port 8000');

app.use(express.static('../testapp/www'));

var badge = 0;

// on server started we can load our index.html page
function app(req, res) {
  fs.readFile('../testapp/www/index.html', function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading client.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

setInterval(function() {
  ++badge;
},1000);

// creating a new websocket to keep the content updated without any AJAX request
io.on('connection', function(socket) {

  console.log('socket id', socket.id);

  setInterval(function() {
    socket.emit('badge', badge);
  },10000);

});



