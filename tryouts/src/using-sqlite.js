/**
 * Using the sqlite3 node module.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite3');

db.serialize(function() {
    // create table
    db.run('CREATE TABLE customer (id NUMERIC, name TEXT');

    // insert data
    var query = db.prepare('INSERT INTO customer VALUES(?,?)');
    for (var i=0; i < 5; i++) {
            query.run(i+1, 'customer ' + (i+1));
    }
    query.finalize();

    // select the data
    db.each('SELECT * FROM customer', function(err, row) {
        if (!err) {
            console.log(row.id + '----' + row.name);
        } else {
            console.log(err);
        }
    });
});

db.close();
