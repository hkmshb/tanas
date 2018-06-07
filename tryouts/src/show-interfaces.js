/**
 * A simple node script to list/show available network interfaces.
 */
var os = require('os');

var interfaces = os.networkInterfaces();
for (var name in interfaces) {
    console.log('Network Interface Name: ' + name);

    for (var idx in interfaces[name]) {
        var addr = interfaces[name][idx];
        console.log('Family: ' + addr.family);
        console.log('IP Address: ' + addr.address);
        console.log('Is Internal: ' + addr.internal);
        console.log('\n');
    }
    console.log('==================================');
}
