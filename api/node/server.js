'use strict';

const http = require('http');
const qs = require('qs');
const Tweetie = require('./tweetie');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const str = req.url.split('?')[1];
  const query = qs.parse(str);

  res.setHeader('Content-Type', 'application/json');

  const tweetie = new Tweetie();

  tweetie.fetch(query.type, query.params).then((response) => {
    res.statusCode = 200;
    res.end(JSON.stringify(response));
  }).catch((err) => {
    res.statusCode = 500;
    res.end(JSON.stringify(err));
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
