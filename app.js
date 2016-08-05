var express = require('express');
var path = require('path');
var gzippo = require('gzippo');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);
var io=require('socket.io').listen(server);
server.listen(process.env.PORT || 3000);



var connections=[];
var records={};




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(gzippo.staticGzip("" + __dirname + "/public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/public/index.html'));
});


io.sockets.on('connection', function(socket){
  
  connections.push(socket);
  console.log("Connected: " + connections.length + " socket(s) connected");
  
  socket.on('getroom',function(roomname){


    if(socket.room) {
      socket.leave(socket.room);
    }
    socket.room = roomname;
    socket.join(roomname);



    
  });

  socket.on('flashsend', function(data){
    socket.broadcast.to(socket.room).emit('flashget',data);

   // io.sockets.to(socket.room).emit('flashget',data);

  });
  
   socket.on('disconnect', function(){   //disconnect is a key word

      connections.splice(connections.indexOf(socket),1);
      console.log("Disconnected: " + connections.length + " socket(s) connected");
    });

    
  

  
});
  
  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
