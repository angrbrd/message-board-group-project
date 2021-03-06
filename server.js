// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Add logging package
// =============================================================
var log = require("loglevel");
// Production deployment
console.log('process.env.NODE_ENV (in server.js) = ' + process.env.NODE_ENV);

if (process.env.NODE_ENV) {
	console.log("Setting log level to ERROR");
	log.setLevel("ERROR");
} else { // Development
	var level = process.env.LOG_LEVEL || "DEBUG";
	console.log("Setting log level to " + level);
	log.setLevel(level);
}

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require(path.join(__dirname, '/models'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes =============================================================

require("./routes/author-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/favorites-api-routes.js")(app);

// Static directory
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/PUBLIC'));

// Syncing our sequelize models and then starting our express app
// Include the {force: true} parameter if you need to update the models
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Beddit is listening on PORT " + PORT);
  });
});
