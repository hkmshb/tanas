/**
 * A simple example of how to use the http module
*/
var http = require('http'),
    port = 8081;


var server = http.createServer(function(req, res) {
    // print request headers
    console.log(req.headers);

    // set a custom response header
    res.setHeader('appID', '1234');

    // send response
    res.write('Welcome to http NodeJS');
    res.end();
});

server.listen(port);
console.log('Server is running on port ' + port.toString());
