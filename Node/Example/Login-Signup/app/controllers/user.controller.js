const userModel = require('../models/user.model'),
    JSON = require('circular-json'),
    Q = require('q'),
    bcrypt = require('bcrypt'),
    _ = require('lodash');

const { ObjectId } = require('mongodb');

module.exports.create = (req, res, next) => {
    var finalRes = {
        "status" : "failure",
        "message" : "",
        "data" : null
    }
    let options = req.headers.options;
    if(
        _.isNil(req.body.name) ||
        _.isNil(req.body.email) ||
        _.isNil(req.body.password) ||
        _.isNil(req.body.role)
    ) {
        finalRes.message = "PARAMETERS_MISSING";
        return res.status(403).send(JSON.stringify(finalRes));
    }

    var userObj = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        isLogedIn: false,
        deleted: false
    };

    userModel.get({
        email: userObj.email,
        deleted: false
    },{}, options).then((user, err)=>{
        if(err) {
            finalRes.message = err;
            return res.status(403).send(JSON.stringify(finalRes));
        }
        if(user) {
            finalRes.message = "User with this mail already exist";
            return res.status(403).send(JSON.stringify(finalRes));
        }
        hashingOfPassword(req.body.password).then((data, err)=>{
            if(err) {
                finalRes.message = err;
                return res.send(403).send(JSON.stringify(finalRes));
            }
            userObj.password = data;
            userModel.add(userObj, options).then((user, err)=>{
                if(err) {
                    finalRes.message = err;
                    return res.status(403).send(JSON.stringify(finalRes));
                }
                delete user.password;
                finalRes.status = "success";
                finalRes.message = "Successfully created";
                finalRes.data = user;
                return res.status(200).send(JSON.stringify(finalRes));
            });
        });
    });
};

module.exports.login = (req, res, next) => {
    var finalRes = {
        "status" : "failure",
        "message" : "",
        "data" : null
    };

    let options = req.headers.options;

    if(_.isNil(req.body.email) || _.isNil(req.body.password)) {
        finalRes.message = "PARAMETERS_MISSING";
        return res.status(403).send(JSON.stringify(finalRes));
    }

    userModel.get({
        email: req.body.email,
        deleted: false
    }, {}, options).then((user, err)=>{
        if(err) {
            finalRes.message = err;
            return res.status(403).send(JSON.stringify(finalRes));
        }

        if(!user) {
            finalRes.message = "User Not Found";
            return res.status(403).send(JSON.stringify(finalRes));
        }

        comparePassword(req.body.password, user.password).then((data, err)=>{
            if(err) {
                finalRes.message = err;
                return res.status(403).send(JSON.stringify(finalRes));
            }
            if(data) {
                userModel.update({

                })
            }
        })
    })
}

module.exports.logout = (req, res, next) =>{
    var finalRes = {
        "status":"failure",
        "message":"",
        "data":null 
    };

    let options = req.headers.options;
    let userId;

    if(req.params.id && req.params.id.length == 24) {
        userId = ObjectId(req.params.id);
    }
    else{
        finalRes.message = "INVALID_CREDENTIALS";
        return res.status(403).send(JSON.stringify(finalRes));
    }

    userModel.update({
        _id: userId
    },{
        $set: {
            isLogedIn: true
        }
    },{}, options).then((data, err)=>{
        if(err) {
            finalRes.message = err;
            return res.status(403).send(JSON.stringify(finalRes));
        }
        finalRes.status="success";
        finalRes.message="Successfully Loged Out";
        finalRes.data = data;
        return res.status(200).send(JSON.stringify(finalRes));
    });
};

module.exports.getAll = (req, res, next) =>{
    var finalRes = {
        "status": "failure",
        "message" : "",
        "data": null
    };
    let options = req.headers.options;
    let selectionCriteria = {
        deleted: false
    };
    let projection = {
        deleted: 0,
        password: 0
    };
    userModel.getAll(selectionCriteria, projection, options).then((users, err)=>{
        if(err) {
            finalRes.message = err;
            return res.status(403).send(JSON.stringify(finalRes));
        }
        finalRes.status = "success";
        finalRes.data = users;
        return res.status(200).send(JSON.stringify(finalRes));
    });
};

module.exports.update = (req, res, next) => {
    var finalRes = {
        "status" : "failure",
        "message": "",
        "data": null
    }
    let userId, newData;
    let options = req.headers.options;
    if(req.params.id && req.params.id.length==24){
        userId = ObjectId(req.params.id);
    }
    else{
        finalRes.message ="INVALID_CREDENTIALS";
        return res.status(403).send(JSON.stringify(finalRes));
    }
    let selectionCriteria = {
        _id: userId
    };
    if(req.body.isDelete) {
        newData = {
            $set: {
                deleted: true
            }
        };
        userModel.update(selectionCriteria, newData, {}, options).then((updateCount, err)=>{
            if(err) {
                finalRes.message = err;
                return res.status(403).send(JSON.stringify(finalRes));
            }
            finalRes.status="success";
            finalRes.data=updateCount;
            finalRes.message="Deleted Successfully";
            return res.status(200).send(JSON.stringify(finalRes));
        });
    } else {
        if(req.body.password && !req.body.isDelete) {
            userModel.get({
                _id: userId,
                deleted: false
            },{},options).then((user, err)=>{
                if(err) {
                    finalRes.message = err;
                    return res.status(401).send(JSON.stringify(finalRes));
                }
                if(user) {
                    hashingOfPassword(req.body.password, user.password).then((data, err)=>{
                        if(err) {
                            finalRes.message = err
                            return res.status(401).send(JSON.stringify(finalRes));
                        }
                        newData = {
                            $set: {
                                name: req.body.name,
                                email: req.body.email,
                                role: req.body.role,
                                password: data
                            }
                        };
                        userModel.update(selectionCriteria, newData, {}, options).then((updatedCount, err)=>{
                            if(err) {
                                finalRes.message = err;
                                return res.status(401).send(JSON.stringify(finalRes));
                            }
                            finalRes.status = "success",
                            finalRes.message= "Updated Successfully",
                            finalRes.data = updatedCount
                            return res.status(200).send(JSON.stringify(finalRes));
                        });
                    });
                } else{
                    if(!user) {
                        finalRes.message ="User Not Found";
                        return res.status(403).send(JSON.stringify(finalRes));
                    }
                }
            });
        } else {
            newData = {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role
                }
            };
            userModel.update(selectionCriteria, newData, {}, options).then((updatedCount, err)=>{
                if(err) {
                    finalRes.message = err;
                    return res.json(finalRes);
                }
                finalRes.status = "success";
                finalRes.data = updatedCount;
                finalRes.message = "Updated Successfully";
                return res.status(200).send(JSON.stringify(finalRes));
            });
        }
    }
};

module.exports.get = (req, res, next) => {
    var finalRes = {
        "status": "failure",
        "message": "",
        "data": null
    }

    let userId;
    let options = req.headers.options;

    if(req.params.id && req.params.id.length == 24){
        userId = ObjectId(req.params.id);
    }
    else{
        finalRes.message = "INVALID_CREDENTIALS";
        res.status(403).send(JSON.stringify(finalRes));
    }
    userModel.get({
        _id: userId,
        deleted: false,
    },{},options).then((user, err)=>{
        if(err) {
            finalRes.message=err
            return res.status(401).send(JSON.stringify(finalRes));
        }
        finalRes.status="success";
        finalRes.data = user;
        return res.status(200).send(JSON.stringify(finalRes));
    });
};

module.exports.welcome = (req, res, next) => {
    var finalRes = {
        "status" : "success",
        "message" : "Welcome"
    };
    return res.status(200).send(JSON.stringify(finalRes));
};

function hashingOfPassword(password) {
    var q = Q.defer();
    bcrypt.hash(password, 10, (err, hash)=>{
        if(err) {
            q.reject("SOMETHING_WENT_WRONG");
        } else {
            q.resolve(hash);
        }
    });
    return q.promise;
}

function comparePassword(password, hashedPassword) {
    var q = Q.defer();
    bcrypt.compare(password, hashedPassword, (err, res)=>{
        if(err) {
            q.reject("SOMETHING_WENT_WRONG");
            return q.promise;
        }
        if(res) {
            q.resolve(true);
            return q.promise;
        } else {
            q.resolve(false);
            return q.promise;
        }
    });
    return q.promise;
}