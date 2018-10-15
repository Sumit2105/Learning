const express = require('express');
const bodyParser = require('body-parser');
const env = require('./config/env');
var db = require('./config/db');
var addOptionsToRequest = require('./app/helpers/addOptionsToRequest');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers,options, Authorization, X-Requested-With, x-access-token, x-email-id, x-device-id, x-device-token, x-device-type, x-system-cookie"
    );
    res.header("Access-Control-Expose-Headers", "userId , options");
    if(req.method === "OPTIONS") return res.send(200);
    next();
});

db.init(function(err){
    var server = app.listen(env.PORT, ()=>{
        console.log('Server is listening on port: '+env.PORT);
    });

    var options = {
        db: db.client
    };

    app.use('/', addOptionsToRequest(options));
    app.use('/', require('./routes/index'));
})