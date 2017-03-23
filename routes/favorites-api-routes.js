// Requiring our models
var db = require("../models");

module.exports = function(app) {
  // Retrieve a list of all the favorites
  app.get("/api/favorites", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // 1. Add a join here to include all of the Authors to these posts
    db.Favorite.findAll({
      where: query,
      include: [ db.Author ]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/favorites", function(req, res) {
    db.Favorite.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
