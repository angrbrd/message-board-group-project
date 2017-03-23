// Requiring our models
var db = require("../models");

module.exports = function(app) {
  // Retrieve the list of all posts
  app.get("/api/posts", function(req, res) {
    console.log('___ENTER GET /api/posts___');

    var query = {};
    if (req.query.authorID) {
      query.authorID = req.query.authorID;
    }
    // Add a join here to include all of the Authors to these posts
    db.Post.findAll({
      where: query,
      include: [ db.Author ]
    }).then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      console.log("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Retrieve a specific post by postID
  app.get("/api/posts/:postID", function(req, res) {
    console.log('___ENTER GET /api/posts/:postID___');

    console.log('postID = ' + req.params.postID);

    var query = {};
    query.postID = req.params.postID;

    // Add a join here to include the Author who wrote the Post
    db.Post.findOne({
      where: query,
      include: [ db.Author ]
    }).then(function(dbPost) {
      console.log(dbPost);

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
      console.log("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Create a new post
  app.post("/api/posts", function(req, res) {
    console.log('___ENTER POST /api/posts___');

    db.Post.create(req.body)
    .then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      console.log("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Depete a specific post by postID
  app.delete("/api/posts/:postID", function(req, res) {
    console.log('___ENTER DELETE /api/posts/:postID___');

    console.log('postID = ' + req.params.postID);

    var query = {};
    query.postID = req.params.postID;

    db.Post.destroy({
      where: query
    }).then(function(dbPost) {
      res.json(dbPost);
    })
    .catch(function (err) {
      console.log("ERR = " + err);

      res.json({status: "ERROR", message: err});
    });
  });

  // Update a specific post by postID
  app.put("/api/posts/:postID", function(req, res) {
    console.log('___ENTER PUT /api/posts/:postID___');

    console.log('postID = ' + req.params.postID);

    var query = {};
    query.postID = req.params.postID;

    db.Post.update(
      req.body,
      {
        where: query
      }).then(function(dbPost) {
        res.json(dbPost);
      })
      .catch(function (err) {
        console.log("ERR = " + err);

        res.json({status: "ERROR", message: err});
      });
  });
};
