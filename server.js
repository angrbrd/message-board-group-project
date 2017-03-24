// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// Routes =============================================================

require("./routes/author-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/favorites-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
// Include the {force: true} parameter if you need to update the models
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Beddit is listening on PORT " + PORT);
  });
});