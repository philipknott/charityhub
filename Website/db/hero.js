// Create a connection to the Cloud(heroku) PostgreSQL server


const { Client } = require('pg');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var pg = require('pg');
var params = { host: '',user: '',
  password: '',
  database: '',ssl: true };
var client = new pg.Client(params);
client.connect();

module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback);
    }
}