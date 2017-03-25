// Requiring our models
var db = require("../models");
var log = require("loglevel").getLogger("user-api-routes");

module.exports = function(app) {
  // Retrieve the list of all users
  app.get("/api/users", function(req, res) {
    log.debug('___ENTER GET /api/users___');

    // Add a join to include all of each User's Posts
    db.User.findAll({ include: [ db.Post ] })
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Retrieve a specific user by UserID
  app.get("/api/users/:userID", function(req, res) {
    log.debug('___ENTER GET /api/users/:userID___');
    log.debug('userID = ' + req.params.userID);

    // Add a join to include all of the User's Posts here
    db.User.findOne({
      where: {
        id: req.params.userID
      },
      include: [ db.Post ]
    })
    .then(function(dbUser) {
      log.debug("dbUser = " + JSON.stringify(dbUser));

      // Check if the user is null, i.e no such user
      if (dbUser === null) {
        // Return an empty object
        res.json({});
      } else {
        // Return existing user data
        res.json(dbUser);
      }
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Create a new user entry
  app.post("/api/users", function(req, res) {
    log.debug('___ENTER POST /api/users___');

    db.User.create(req.body)
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      // Need better error handling here...
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Delete a specific user by userID
  app.delete("/api/users/:userID", function(req, res) {
    log.debug('___ENTER DELETE /api/users/:userID___');
    log.debug('userID = ' + req.params.userID);

    db.User.destroy({
      where: {
        id: req.params.userID
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });
};
