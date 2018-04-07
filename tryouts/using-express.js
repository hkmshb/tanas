/**
 * Using the express node module.
 */
var express = require('express'),
    app = express(),
    port = 8083;


app.get('/', function(req, res) {
    res.write('Welcome to using Express node module.');
    res.end();
});

app.get('/admin', function(req, res) {
    res.write('Admin page requested, using ExpressJS server.');
    res.end();
});

app.get('/customer', function(req, res) {
    res.write('Customer page requested, using ExpressJS server.');
    res.end();
});


app.listen(port);
console.log('Server is running on port ' + port);
