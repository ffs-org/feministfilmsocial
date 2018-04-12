import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 8000);

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.post('/subscribe', urlencodedParser, (req, res) => {
  res.send({ res: 'ok' });
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('listening on :' + app.get('port'));
});
