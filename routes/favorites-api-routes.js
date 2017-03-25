// Requiring our models
var db = require("../models");
var log = require("loglevel").getLogger("favorites-api-routes");

module.exports = function(app) {
  // Retrieve a list of all the favorites
  app.get("/api/favorites", function(req, res) {
    log.debug('___ENTER GET /api/favorites___');

    // If the request is specifying a particular user
    var query = {};
    if (req.query.user) {
      query.UserID = req.query.user;
    }

    // Add a join here to include all of the Users to these favorites
    db.Favorite.findAll({
      where: query,
      include: [ db.User ]
    })
    .then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Retrieve a specific favorite by favoriteID
  app.get("/api/favorites/:favoriteID", function(req, res) {
    log.debug('___ENTER GET /api/favorites/:favoriteID___');
    log.debug('favoriteID = ' + req.params.favoriteID);

    // Add a join here to include the User who wrote the Post
    db.Favorite.findOne({
      where: {
        id: req.params.favoriteID
      },
      include: [ db.User ]
    }).then(function(dbPost) {
      log.debug(dbPost);

      // Check if the favorite is null, i.e no such favorite
      if (dbPost === null) {
        // Return an empty object
        res.json({});
      } else {
        // Return existing favorite data
        res.json(dbPost);
      }
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Create a new favorite
  app.post("/api/favorites", function(req, res) {
    log.debug('___ENTER POST /api/favorites___');

    db.Favorite.create(req.body)
    .then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Depete a specific favorite by favoriteID
  app.delete("/api/favorites/:favoriteID", function(req, res) {
    log.debug('___ENTER DELETE /api/favorites/:favoriteID___');
    log.debug('favoriteID = ' + req.params.favoriteID);

    db.Favorite.destroy({
      where: {
        id: req.params.favoriteID
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });
};
