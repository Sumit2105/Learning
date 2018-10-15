const express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./config/db'),
    env = require('./config/env'),
    router = require('./routes/index');


const app = express();
const PORT = env.PORT;

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header('Content-Type', 'application/json');
    next();
});

router(app, db);

db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=>{
        console.log('Server is up and running at: ' + PORT);    
    })
});
