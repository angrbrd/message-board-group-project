// FirebaseUI config.
var uiConfig = {
  // Url to redirect to after a successful sign-in.
  'signInSuccessUrl': '/tripPlanner',
  'callbacks': {
    'signInSuccess': function(user, credential, redirectUrl) {
        // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl
        return true
    }
  },
  'signInOptions': [
    // TODO(developer): Remove the providers you don't need for your app.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
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

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded to include the FirebaseUI sign-in widget
// within the element corresponding to the selector specified.
ui.start('#firebaseui-auth-container', uiConfig);









// initApp 
function initApp() {
  console.log("___ENTER initApp");


}

// Initialize the Firebase UI when the document has finished loading
$(document).ready(initApp());
