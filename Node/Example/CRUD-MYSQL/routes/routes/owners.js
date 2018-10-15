'use strict'

module.exports = (app, db) =>{
    //GET all owners
    app.get('/owners', (req, res)=>{
        db.owners.findAll()
                .then(owners => {
                    res.json(owners);
                });
    });

    //GET one owner by id
    app.get('/owner/:id', (req, res)=>{
        const id = req.params.id;
        db.owners.find({
            where: {id: id}
        }).then(owner=>{
            res.json(owner);
        });
    });

    //POST single owner
    app.post('/owner', (req, res)=>{
        const name = req.body.name;
        const role = req.body.role;
        console.log(db);
        db.owners.create({
            name: name,
            role: role
        }).then(newOwner=>{
            res.json(newOwner);
        });
    });

    //PATCH single owner
    app.patch('/owner/:id', (req, res)=>{
        const id = req.params.id
        const updates = req.body.updates
        db.owners.find({
            where: {id:id}
        }).then(owner=>{
            return owner.updateAttributes(updates);
        }).then(updatedOwner=>{
            res.json(updatedOwner)
        });
    });

    //DELETE single user
    app.delete('/owner/:id', (req, res)=>{
        const id = req.params.id;
        db.owners.destroy({
            where: {id: id}
        }).then(deletedOwner=>{
            res.json(deletedOwner);
        });
    });
}