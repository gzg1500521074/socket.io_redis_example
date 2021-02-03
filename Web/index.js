var app = require('express')();
var http = require('http').Server(app);

const io = require('socket.io-client');

//connect to namespaces
if(process.env.APPENV == "prod"){
  //socket = io('ws://brpineda-win-node-socket.azurewebsites.net');
  //socket2 = io('ws://brpineda-win-node-socket.azurewebsites.net/test-namespace');
  socket = io('ws://istahisocketrepro.azurewebsites.net');
  socket2 = io('ws://istahisocketrepro.azurewebsites.net/test-namespace');  
  //socket = io('ws://istahisocketreprolinux.azurewebsites.net');
  //socket2 = io('ws://istahisocketreprolinux.azurewebsites.net/test-namespace');  
}else{
  socket = io('ws://istahisocketrepro.azurewebsites.net/');
  socket2 = io('ws://localhost:5000/test-namespace');
}

//Default namespace
socket.on('connect', () => {
  socket.emit('identifier',
  {
    instanceId: process.env.WEBSITE_INSTANCE_ID,
    socketId: socket.id,
    pingInterval: 25000,
    timeout: 60000,
    pingTimeout:60000,
    namespace: 'default'
  });
});

//Second namespace
socket2.on('connect', () => {
  socket2.emit('identifier',
  {
    instanceId: process.env.WEBSITE_INSTANCE_ID,
    socketId: socket.id,
    pingInterval:25000,
    timeout: 30000,
    pingTimeout:30000,
    namespace: 'test-namespace'
  });
});

app.get('/', (req, res) => {
  var items = Array('523','3452','334','31','534')
  socket.emit('hello', {
    greeting: 'Hello from socket 1 local!'
  });
  res.send('Hello message local' + items[Math.floor(Math.random()*4)]);
});

app.get('/test', (req, res) => {
  socket2.emit('hello2', {
    greeting: 'Hello from socket 2!'
  });
  res.send('Hello2 message');
});

http.listen(process.env.PORT || 3000, () => {
  console.log('Server is up and running');
});
