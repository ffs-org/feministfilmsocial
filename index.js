'use strict'

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import subscribeHandler from './controllers/subscribe';

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.enable('trust proxy');
app.use(function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] === 'https' || req.secure) return next();

    return res.redirect(301, `https://${join(req.hostname, req.url)}`);
  }
  return next();
});

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 8000);

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.post('/subscribe', urlencodedParser, subscribeHandler);

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('listening on :' + app.get('port'));
});
