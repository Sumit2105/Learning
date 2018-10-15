const Q = require('q'),
    _ = require('lodash'),
    collectionName = "users";

module.exports.add = (userObj, options) => {
    var q = Q.defer();
    var db = options.db;

    if(_.isNil(db)){
        q.reject("SOMETHING_WENT_WRONG");
        return q.promise;
    }
    if(
        _.isNil(userObj.name) ||
        _.isNil(userObj.email) ||
        _.isNil(userObj.password) ||
        _.isNil(userObj.role)
    ){
        q.reject("PARAMETERS_MISSING");
        return q.promise;
    }

    db.collection(collectionName).insert(userObj, (err, doc) => {
        if(err) {
            q.reject('SOMETHING_WENT_WRONG');
            return q.promise;
        }
        console.log("Adding user information to db");
        q.resolve(doc.ops[0]);
        return q.promise;
    });
    return q.promise;
};

module.exports.getAll = (selectionCriteria, queryOptions, options) => {
    var q = Q.defer();
    var db = options.db;

    if(_.isNil(db)) {
        q.reject("SOMETHING_WENT_WRONG");
        return q.promise;
    }

    if(_.isNil(selectionCriteria)) selectionCriteria = {};

    db.collection(collectionName)
    .find(selectionCriteria, queryOptions)
    .toArray((err, docs)=>{
        if(err) {
            q.reject("SOMETHING_WENT_WRONG");
            return q.promise;
        }
        console.log("Retrieving users information");
        q.resolve(docs);
    });
    return q.promise;
}

module.exports.get = (selectionCriteria, queryOptions, options) => {
    var q = Q.defer();
    var db = options.db;

    if(_.isNil(db)) {
        q.reject("SOMETHING_WENT_WRONG");
        return q.promise;
    }

    if(_.isNil(selectionCriteria)) selectionCriteria = {};

    db.collection(collectionName).findOne(
        selectionCriteria,
        queryOptions,
        (err, doc) =>{
            if(err) {
                q.reject("SOMETHING_WENT_WRONG");
                return q.promise;
            }
            console.log("Retrieving User Information");
            q.resolve(doc)
        });
        return q.promise;
};

module.exports.update = (
        selectionCriteria,
        updateCriteria,
        updateOptions,
        options
    ) => {
        var q = Q.defer();
        db = options.db;

        db.collection(collectionName).update(
            selectionCriteria,
            updateCriteria,
            updateOptions,
            (err, doc)=>{
                if(err) {
                    q.reject("SOMETHING_WENT_WRONG");
                    return q.promise;
                }
                if(doc.result.n) q.resolve(true);
                else q.resolve(false);
                console.log("Updating user(s)");
            });
            return q.promise;
    };
