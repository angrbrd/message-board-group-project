// Requiring our models
var db = require("../models");

module.exports = function(app) {
  // Retrieve a list of all the favorites
  app.get("/api/favorites", function(req, res) {
    console.log('___ENTER GET /api/favorites___');

    // If the request is specifying a particular author
    var query = {};
    if (req.query.author) {
      query.AuthorID = req.query.author;
    }

    // Add a join here to include all of the Authors to these favorites
    db.Favorite.findAll({
      where: query,
      include: [ db.Author ]
    })
    .then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      console.log("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Retrieve a specific favorite by favoriteID
  app.get("/api/favorites/:favoriteID", function(req, res) {
    console.log('___ENTER GET /api/favorites/:favoriteID___');

    console.log('favoriteID = ' + req.params.favoriteID);

    // Add a join here to include the Author who wrote the Post
    db.Favorite.findOne({
      where: {
        id: req.params.favoriteID
      },
      include: [ db.Author ]
    }).then(function(dbPost) {
      console.log(dbPost);

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
      console.log("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Create a new favorite
  app.post("/api/favorites", function(req, res) {
    console.log('___ENTER POST /api/favorites___');

    db.Favorite.create(req.body)
    .then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      console.log("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Depete a specific favorite by favoriteID
  app.delete("/api/favorites/:favoriteID", function(req, res) {
    console.log('___ENTER DELETE /api/favorites/:favoriteID___');

    console.log('favoriteID = ' + req.params.favoriteID);

    db.Favorite.destroy({
      where: {
        id: req.params.favoriteID
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      console.log("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });
};
