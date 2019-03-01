import React from "react";

class GoogleAuth extends React.Component {
  state = {isSignedIn: null};
  // null bec we don't know whether the user is
  // signed in or not signed in when our app first loads

  componentDidMount = () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1036100617710-l63902et7ppcnemi79gsacb7dane91vu.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({isSignedIn: this.auth.isSignedIn.get()});
        });
    });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I don't know if we are signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I am signed in!</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;

/* 
.init() returns a Promise
window.gapi.getAuthInstance().signIn()
window.gapi.getAuthInstance().signOut()

Auth Component
1. Get a reference to the 'auth' object after it is initialized
2. Figure out if the user is currently signed in
3. Print their authentication status on screen
*/
