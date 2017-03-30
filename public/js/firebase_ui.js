/**
 * FirebaseUI initialization to be used in a Single Page application context.
 */

// FirebaseUI config
var uiConfig = {
  'callbacks': {
    // Called when the user has been successfully signed in
    'signInSuccess': function(user, credential, redirectUrl) {
        handleSignedInUser(user);

        // Do not redirect
        return false;
    }
  },
  // Opens IDP Providers sign-in flow in a popup
  'signInFlow': 'popup',
  'signInOptions': [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/plus.login']
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes :[
        'public_profile',
        'email'
      ]
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  'tosUrl': 'https://www.google.com/policies/terms/'
};

// Initialize the FirebaseUI Widget using Firebase
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// currentUserID variable that keeps track of the currently logged in user
var currentUserID = null;

// The start method will wait until the DOM is loaded to include the FirebaseUI
// sign-in widget within the element corresponding to the selector specified.
ui.start('#firebaseui-auth-container', uiConfig);

// handleSignedInUser presents the appropriate UI to an authenticated user
var handleSignedInUser = function(user) {
  // User is signed in
  console.log("User is signed in!");

  // Set the currentUserID variable for future use
  currentUserID = user.uid;

  // Get the relevant user information from the returned user variable
  var displayName = user.displayName;
  var email = user.email;
  var emailVerified = user.emailVerified;
  var photoURL = user.photoURL;
  var uid = user.uid;
  var providerData = user.providerData;

  // Print the user data for confirmation
  console.log(
    JSON.stringify({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        photoURL: photoURL,
        uid: uid,
        providerData: providerData
      })
  );

  // Update the UI display
  $('#name').html(displayName);

  $('#email').html(email);
  if (photoURL) {
    $('#user-image').attr('src', photoURL);
    $('#user-image').show();
  } else {
    $('#user-image').attr('src', 'bio_placeholder.jpg');
    $('#user-image').show();
  }
  $('#user-signed-in').show();
  $('#user-signed-out').hide();
};

// handleSignedOutUser presents the appropriate UI to a non-authenticated user
var handleSignedOutUser = function() {
  // User is signed out
  console.log("User is signed out!");

  // Clear the UI
  $('#user-signed-in').hide();
  $('#user-signed-out').show();

  // Display Firebase auth container
  ui.start('#firebaseui-auth-container', uiConfig);
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or out.
firebase.auth().onAuthStateChanged(function(user) {
  // The observer is also triggered when the user's token has expired and is
  // automatically refreshed. In that case, the user hasn't changed so we should
  // not update the UI.
  if (user && user.uid == currentUserID) {
    return;
  }

  $('#loading').hide();
  $('#loaded').show();

  // Handle the user appropriately
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

// initApp attaches the required event listeners
function initApp() {
  console.log("___ENTER initApp___");

  // Log out the current user when the "Logout" button is clicked
  $("#logout-button").on("click", function() {
    firebase.auth().signOut();
  });
};

// Initialize the application
$(document).ready(initApp());
