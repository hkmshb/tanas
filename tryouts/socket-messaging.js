/**
 * A simple script to test sockets messaging.
 * 
 * Usage:
 *  node socket-messaging [mode]
 *  
 *  options:
 *    mode:
 *      --server: runs the script as a socket server
 *      --client: runs the script as a socket client
 */

var USAGE_MSG = 'Usage:\n  node socker-messaging [mode=(--client|--server)]';
if (process.argv.length != 3) {
    console.log('error: mode argument is missing.\n');
    console.log(USAGE_MSG);
    process.exit();
}

var mode = process.argv[2];
if (['--server', '--client'].indexOf(mode.toLowerCase()) == -1) {
    console.log('error: invalid mode provided.\n');
    console.log(USAGE_MSG);
    process.exit();
}

var SERVER_PORT = 9099;
var net = require('net');

function runServer() {
    var server = net.createServer(function(client) {
        console.log('client connected');
        console.log('client ip address: ' + client.remoteAddress);
        console.log('is IPv6: ' + net.isIPv6(client.remoteAddress));
        console.log('total server connections: ' + server.connections);

        // wait for data from client
        client.on('data', function(data) {
            console.log('   >>> hurray. client sent data: ' + data.toString());

            // write data back on the client data
            client.write('Hello client; good to hear from you...');
        });

        // close socket event from the client
        client.on('end', function() {
            console.log('client disconnected');
        });
    });

    // handle server errors
    server.on('error', function(err) {
        console.log(err);
        server.close();
    });

    server.listen(SERVER_PORT, function() {
        console.log('Server started on port ' + SERVER_PORT);
    });
}

function runClient() {
    var SERVER_ADDR = 'localhost';
    console.log('connecting to the server ...');
    var client = net.connect({server:SERVER_ADDR, port: SERVER_PORT}, function() {
        console.log('client connected');

        // send data to the server
        console.log('sending data to the server');
        client.write('  ::: greetings from the client socket');
    });

    // process data from the server
    client.on('data', function(data) {
        console.log('received data: ' + data.toString());
    });

    // handle error on the client side
    client.on('error', function(err) {
        console.log('client error: ' + err);
    });

    client.on('end', function() {
        console.log('client:: client disconnected');
    });
}

if (mode == '--server') {
    runServer();
} else {
    runClient();
}