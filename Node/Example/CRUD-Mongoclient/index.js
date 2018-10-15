const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const env = require('./config/env');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


app.get('/',(req, res)=>{
    res.send('Yep I am working');
});

app.get('/test',(req, res)=>{
    res.send('Test route');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect(env.DATABASE_URL, { useNewUrlParser: true }, (err, db)=>{
    if(err) {
        return console.log(err);
    }
    app.listen(env.PORT, ()=>{
        console.log('Listening on port: '+env.PORT);
    })

    var dbase = db.db(env.DATABASE_NAME);

    app.post('/name/add', (req, res, next)=>{
        var name ={
            first_name: req.body.first_name,
            last_name: req.body.last_name
        };

        dbase.collection("name").save(name,(err, result)=>{
            if(err) console.log(err);
            res.send('name added successfully');
        });
    });

    app.get('/name', (req, res)=>{
        dbase.collection("name").find().toArray((err, results)=>{
            res.send(results);
        });
    });

    app.get('/name/:id', (req, res, next)=>{
        if(err) throw err;
        let id = ObjectID(req.param.id);

        dbase.collection("name").find(id).toArray((err, result)=>{
            if(err) throw err;
            res.send(result);
        });
    });

    app.put('/name/update/:id', (req, res, next)=>{
        let id = {
            _id: ObjectID(req.param.id) 
        };

        dbase.collection("name").update({_id:id}, {$set:{'first_name': req.body.first_name, 'last_name': req.body.last_name}},(err,result)=>{
            if(err) throw err;
            res.send('user updated successfully');
        });
    });

    app.delete('/name/delete/:id',(req, res, next)=>{
        let id = ObjectID(req.params.id);

        dbase.collections("name").deleteOne(id, (err, result)=>{
            if(err) {
                throw err;
            }
            res.send("user deleted");
        });
    });
    
});