// Define the jQuery Ajax PUT function
$.put = function(url, data, callback, type) {
  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: type
  });
}

// Register event handlers for the modal dialogs
$("#save-image-button").on("click", function() {
  console.log('Save image button clicked!');

  // Grab the image link from the modal dialog
  var imgLink = $("#user-image-entry").val().trim();

  // Place the Ajax call to update the user image
  $.put("api/users/" + currentUserID, {"photoLink": imgLink})
  .done(function(data) {
    // Close the modal dialog
    $('#imageModal').modal('hide');

    window.location.replace("/");
  });
});

$("#save-image-cancel").on("click", function() {
  console.log('Cancel button clicked!');

  $("#user-image-entry").val("");
});

$("#save-about-button").on("click", function() {
  console.log('Save about button clicked!');
  





  $('#aboutModal').modal('hide');
});

$("#save-about-cancel").on("click", function() {
  console.log('Cancel button clicked!');
  
  $("#user-about-entry").val("");
});

$("#create-post-button").on("click", function() {
  console.log('Create post button clicked!');
  





  $('#postModal').modal('hide');
});

$("#create-post-cancel").on("click", function() {
  console.log('Cancel button clicked!');
  
  $("#post-title-entry").val("");
  $("#post-thumbnail-entry").val("");
  $("#post-content-entry").val("");
});

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
    var uid = post.User.uid;
    var postUser = post.User.name;



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
                <p class="small">Created ` + postCreated + ` by <a href="/api/users/` + uid + `">` + postUser + ` </a></p>

                </div>

                </div> `);

   return newInputRow;

  }

});