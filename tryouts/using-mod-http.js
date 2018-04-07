/**
 * A simple example of how to use the http module
*/
var http = require('http'),
    port = 8081;


var server = http.createServer(function(req, res) {
    /* handling requests for different url paths; the url paths
     * are regarded as pages for this sample application. Target
     * paths to be handled:
     *  - /
     *  - /customer
     *  - /admin
     */

    if (req.url == '/') {
        res.write('Root page requested.');
    } else if (req.url == '/customer') {
        res.write('Customer page requested.');
    } else if (req.url == '/admin') {
        res.write('Admin page requested.');
    } else {
        res.write('Page not found.');
    }
    res.end();
});

server.listen(port);
console.log('Server is running on port ' + port.toString());
