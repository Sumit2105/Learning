'use strict'
const routes = [
    require('./routes/owners'),
    require('./routes/pets')
];

module.exports = function router(app,db){
    return routes.forEach((route)=>{
        route(app, db);
    })
}