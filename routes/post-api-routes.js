// Requiring our models
var db = require("../models");
var log = require("loglevel").getLogger("post-api-routes");

module.exports = function(app) {
  // Retrieve the list of all posts
  app.get("/api/posts", function(req, res) {
    log.debug('___ENTER GET /api/posts___');

    // If the request is specifying a particular user
    var query = {};
    if (req.query.user) {
      query.UserID = req.query.user;
    }

    // Add a join here to include all of the users to these posts
    db.Post.findAll({
      where: query,
      include: [ db.User ]
    }).then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Retrieve a specific post by postID
  app.get("/api/posts/:postID", function(req, res) {
    log.debug('___ENTER GET /api/posts/:postID___');
    log.debug('postID = ' + req.params.postID);

    // Add a join here to include the User who wrote the Post
    db.Post.findOne({
      where: {
        id: req.params.postID
      },
      include: [ db.User ]
    }).then(function(dbPost) {
      log.debug(dbPost);

      // Check if the post is null, i.e no such post
      if (dbPost === null) {
        // Return an empty object
        res.json({});
      } else {
        // Return existing post data
        res.json(dbPost);
      }
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Create a new post
  app.post("/api/posts", function(req, res) {
    log.debug('___ENTER POST /api/posts___');

    db.Post.create(req.body)
    .then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Depete a specific post by postID
  app.delete("/api/posts/:postID", function(req, res) {
    log.debug('___ENTER DELETE /api/posts/:postID___');
    log.debug('postID = ' + req.params.postID);

    db.Post.destroy({
      where: {
        id: req.params.postID
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      log.error("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Update a specific post by postID
  app.put("/api/posts/:postID", function(req, res) {
    log.debug('___ENTER PUT /api/posts/:postID___');
    log.debug('postID = ' + req.params.postID);

    db.Post.update(
      req.body,
      {
        where: {
          id: req.params.postID
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
