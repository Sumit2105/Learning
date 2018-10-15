const env = require('./env');
const { MongoClient } = require('mongodb');

module.exports.init = function(callback) {
    MongoClient.connect(env.DATABASE_URL, { useNewUrlParser:true }, (err, client)=>{
        if(err) {
            return console.log(err);
        }
        module.exports.client = client.db(env.DATABASE_NAME);
        callback(err);
    });
};