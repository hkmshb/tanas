const esearch = require('elasticsearch');
const express = require('express');
const path = require('path');
const app = express();
const port = 8083;


var client = new esearch.Client({
  host: process.env.ES_REMOTE,
  log: 'debug'
});

app.get('/', (req, res) => {
  var p = path.join(__dirname, '/index.html');
  res.sendFile(p);
});

app.get('/search', (req, res) => {
  // contact configured ES
  console.log('q: ' + req.query.q);
  let params = {
    index: 'location-state,location-lga,location-ward',
    body: {
      query: { 
        match: { name: `${req.query.q}` }
      }
    }
  }
  client.search(params, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
    res.end();
  });
});

app.listen(port)
console.log("Server up at 'localhost:" + port + "'");
