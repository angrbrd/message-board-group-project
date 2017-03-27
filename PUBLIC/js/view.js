$(document).ready(function() {
  var postContainer = $(".post-container");

  var posts;

  getPosts();

  function initializeRows() {
    postContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      rowsToAdd.push(createNewRow(posts[i]));
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

  function createNewRow(post) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item post-item");
    var newPostSpan = $("<span>");
    newPostSpan.text(post.title);
    newInputRow.append(newPostSpan);
    var newPostInput = $("<input>");
    newPostInput.attr("type", "text");
    newPostInput.addClass("edit");
    newPostInput.css("display", "none");
    newInputRow.append(newPostInput);
    newInputRow.data("post", post);
    return newInputRow;
  }

});