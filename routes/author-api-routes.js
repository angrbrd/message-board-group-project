// Requiring our models
var db = require("../models");
var log = require("loglevel").getLogger("author-api-routes");

module.exports = function(app) {
  // Retrieve the list of all authors
  app.get("/api/authors", function(req, res) {
    log.debug('___ENTER GET /api/authors___');

    // Add a join to include all of each Author's Posts
    db.Author.findAll({ include: [ db.Post ] })
    .then(function(dbAuthor) {
      res.json(dbAuthor);
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Retrieve a specific author by authorID
  app.get("/api/authors/:authorID", function(req, res) {
    log.debug('___ENTER GET /api/authors/:authorID___');
    log.debug('authorID = ' + req.params.authorID);

    // Add a join to include all of the Author's Posts here
    db.Author.findOne({
      where: {
        id: req.params.authorID
      },
      include: [ db.Post ]
    })
    .then(function(dbAuthor) {
      log.debug("dbAuthor = " + JSON.stringify(dbAuthor));

      // Check if the author is null, i.e no such author
      if (dbAuthor === null) {
        // Return an empty object
        res.json({});
      } else {
        // Return existing author data
        res.json(dbAuthor);
      }
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Create a new author entry
  app.post("/api/authors", function(req, res) {
    log.debug('___ENTER POST /api/authors___');

    db.Author.create(req.body)
    .then(function(dbAuthor) {
      res.json(dbAuthor);
    })
    .catch(function(err) {
      // Need better error handling here...
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Delete a specific author by authorID
  app.delete("/api/authors/:authorID", function(req, res) {
    log.debug('___ENTER DELETE /api/authors/:authorID___');
    log.debug('authorID = ' + req.params.authorID);

    db.Author.destroy({
      where: {
        id: req.params.authorID
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    })
    .catch(function(err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });
};
