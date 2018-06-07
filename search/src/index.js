const esearch = require('elasticsearch');
const express = require('express');
const app = express();
const port = 8083;


var client = new esearch.Client({
  host: process.env.ES_REMOTE,
  log: 'debug'
});

app.get('/', (req, res) => {
    var output = 'Hello ES + NodeJS\n\n';

    // contact configured ES
    client.ping({}, (err) => {
        if (err) {
            output += 'ES Error: ' + err;
        } else {
            output += 'Tada!!! ES Reached...';
        }
        res.write(output);
        res.end();
    });
});

app.listen(port)
console.log("Server up at 'localhost:" + port + "'");
