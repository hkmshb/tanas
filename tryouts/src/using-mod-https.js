/**
 * A simple example of how to use the https module
 * 
 * A self-signed SSL certificate is used. The certificate is created using
 * openssl.
 * 
 * - generate a private key that is 1024 long
 *      $ openssl genrsa -des3 -out tryout.key 1024
 *
 * - create certificate file
 *      $ openssl req -new -key tryout.key -out tryout.csr
 * 
 * - now sign created certificate
 *      $ openssl x509 -req -days 365 -in tryout.csr -signkey tryout.key -out tryout.cert
 */

// read .env file
// require('dotenv').load();

var https = require('https'),
    fs = require('fs'),
    port = 8082,
    options = {
        key: fs.readFileSync('./../tryout.key'),
        cert: fs.readFileSync('./../tryout.cert'),
        passphrase: process.env.TRYOUT_CERT_PASS_PHRASE
    };

var server = https.createServer(options, function(req, res) {
    res.write('Welcome to https NodeJS\n');
    res.write('Pass Phrase: ' + process.env.TRYOUT_CERT_PASS_PHRASE);
    res.end();
});

server.listen(port);
console.log('Server is running on port ' + port);
