import express from 'express';
import http from 'http';

const app = express();

app.use(express.static(__dirname + '/public'))

app.set('port', process.env.PORT || 8000);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('listening on :' + app.get('port'));
});
