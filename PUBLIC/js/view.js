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
  $.put("/api/users/" + currentUserID, {"photoLink": imgLink})
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
  
  // Grab the about text from the modal dialog
  var aboutTxt = $("#user-about-entry").val().trim();

  // Place the Ajax call to update the user about entry
  $.put("/api/users/" + currentUserID, {"about": aboutTxt})
  .done(function(data) {
    // Close the modal dialog
    $('#aboutModal').modal('hide');

    window.location.replace("/");
  });
});

$("#save-about-cancel").on("click", function() {
  console.log('Cancel button clicked!');
  
  $("#user-about-entry").val("");
});

$("#create-post-button").on("click", function() {
  console.log('Create post button clicked!');
  
  // Grab the post information from the modal dialog
  var postTitle = $("#post-title-entry").val().trim();
  var postThumbnail = $("#post-thumbnail-entry").val().trim();
  var postContent = $("#post-content-entry").val().trim();

  // Place the Ajax call to create a new post
  $.post("/api/posts", 
    {
      "title": postTitle,
      "body": postContent,
      "UserUid": currentUserID,
      "photolink": postThumbnail
    })
  .done(function(data) {
    // Close the modal dialog
    $('#postModal').modal('hide');

    window.location.replace("/");
  });
});

$("#create-post-cancel").on("click", function() {
  console.log('Cancel button clicked!');
  
  $("#post-title-entry").val("");
  $("#post-thumbnail-entry").val("");
  $("#post-content-entry").val("");
});

// Register event handlers for the upvote and downvote buttons
$(document).on("click", ".upvoteButton", updateUpDownVote);
$(document).on("click", ".downvoteButton", updateUpDownVote);

// updateUpDownVote updates the database entries for upvote and downvote
function updateUpDownVote() {
  console.log("ENTER updateUpDownVote");

  var postElement = $(this).closest(".retrieved-post");
  var postID = postElement.attr("id");
  var id = postID.substring(postID.indexOf("_") + 1, postID.length);
  var votes = parseInt(postElement.find(".postVoteCount").text());

  // Upvote button clicked
  if ($(this).hasClass("upvoteButton")) {
    // Handle upvote button
    console.log("Upvote");

    postElement.find(".postVoteCount").text(votes + 1);

    // Update the database entry
    $.put("/api/posts/" + id, {"votes": votes + 1})
    .done(function(data) {
      console.log('Updated votes in database');
    });
  } else if ($(this).hasClass("downvoteButton")) {
    // Handle downvote button
    console.log("Downvote");

    postElement.find(".postVoteCount").text(votes - 1); 

    // Update the database entry
    $.put("/api/posts/" + id, {"votes": votes - 1})
    .done(function(data) {
      console.log('Updated votes in database');
    });
  }
}

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



   var newInputRow = $(`<br><div class="retrieved-post col-md-9" id = "post_` + postID + `">

                <div class="row">

                <div class="col-md-2">
                    <div align="center"><img src="upvote" class="tiny upvoteButton"> </div></img>
                    <div class="mediumtext postVoteCount" align="center">   ` + postVotes + ` </div>
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