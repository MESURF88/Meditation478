var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var value = 1;
  var see_first = 0;
  var see_second = 0;
  var see_third = 0;
  var count_output = 1;
socket.on('begin', function(){
  io.emit('breath control', 'Breathe in');

  setInterval(() => {
      if (count_output === 9){
        count_output = 0;
      }

     if (value % (5) == 0 && see_first === 0){
        io.emit('breath control', 'Breathe hold 7 seconds');
        see_first = 1;
        see_third = 1;
        see_second = 0;
        count_output = 1;
      }
      else if (value % (12) == 0 && see_second === 0){
        io.emit('breath control', 'Breathe out');
        see_first = 1;
        see_second = 1;
        see_third = 0;
        count_output = 1;
      }
      else if (value % (20) == 0 && see_third ===0){
        io.emit('breath control', 'Breathe in');
        see_first = 0;
        see_second = 1;
        see_third = 1;
        value = 0;
        count_output = 0;
        io.emit('breath control', ' ');
      }

      if (count_output != 0){
        io.emit('breath control', count_output);
      }
      value++;
      count_output++;
  }, 1000);


  });
});



http.listen(port, function(){
  console.log('listening on localhost:' + port);
});
