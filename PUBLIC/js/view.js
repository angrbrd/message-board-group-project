$(document).ready(function() {
  var postContainer = $(".post-container");

  var posts;

  getPosts();

  function initializeRows() {
    postContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      rowsToAdd.push(createNewRow(posts[i],i));
    }
    postContainer.prepend(rowsToAdd);
  }

  function getPosts() {
    $.get("/api/posts", function(data) {
      console.log("Posts", data);
      posts = data;
      initializeRows();
    });
  }

  function createNewRow(post, i) {

    var postID = post.id;
    var postTitle = post.title;
    var postBody = post.body;
    var postVotes = post.votes;
    var postPhoto = post.photolink;
    var postCreated = moment(post.createdAt, "YYYYMMDD").fromNow();


   var newInputRow = $(`<br><div class="col-md-9" id = "post_` + postID + `">

                <div class="row">

                <div class="col-md-2">
                    <div align="center"><img src="upvote" class="tiny upvoteButton"> </div></img>
                    <div class="mediumtext" align="center">   ` + postVotes + ` 
                
                    </div>
                    <div align="center"><img src="downvote" class="tiny downvoteButton"> </div></img>
                </div>

                <div class="col-md-2">
                    <img src="` + postPhoto + ` " class="picture">
                </div>

                <div class="col-md-8">
                    <h4><a href="/api/posts/` + postID + `">` + postTitle + ` </a></h4>
                <p id = "postBody"> ` + postBody + `
                </p>
                <p class="small">Created ` + postCreated + `</p>

                </div>

                </div> `);

   return newInputRow;

  }

});