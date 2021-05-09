const express = require('express');
const app = express();
const port = 3000;

var mongoose = require('mongoose');
var mongoDBHostname = process.env.mongoDBHostname || "localhost";

var mongoDBPort = process.env.mongoDBPort || "27017";

var mongoDBName = process.env.mongoDBName || "RecipesDB";

var mongoDBURI = 'mongodb://'+mongoDBHostname+':'+mongoDBPort+"/"+mongoDBName;

mongoose.connect(mongoDBURI, {
    reconnectTries: 10,
    reconnectInterval: 500,
    poolSize: 10,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useNewUrlParser: true
});

console.log('Connecting to ... ');


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var routesActors = require('./api/routes/actorRoutes');
// var routesItems = require('./api/routes/itemRoutes'); 
// var routesOrders = require('./api/routes/orderRoutes');                <- ours routes

// routesActors(app);
// routesItems(app);
// routesOrders(app);


mongoose.connection.on("open", function(err,conn){
    app.listen(port,function(){
        console.log('Recipe API server started out ');
    });
})

mongoose.connection.on("error", function (err, conn) {
    console.error("DB init error " + err);
});