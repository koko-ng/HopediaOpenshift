var api = require('hopedia_api'),
    server = require('hopedia_web_server');
var assert = require('assert');
var mongo = require('mongodb').MongoClient;

var url;
var db_name='db'
if(process.env.OPENSHIFT_MONGODB_DB_URL){
	url = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
else
	url = 'mongodb://localhost:27017/test';

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

mongo.connect(url, function(err, database) {
	assert.equal(null, err);
	console.log("Connected correctly to server.");
	api({
		database: database,
		secret: '128-bit',
		port:8081,
		hostname: server_ip_address,
	});

	server({
		database: database,
		secret: '128-bit',
		port:server_port,
		hostname: server_ip_address,
		mailURI: process.env.OPENSHIFT_MAIL_URI
	});
});




