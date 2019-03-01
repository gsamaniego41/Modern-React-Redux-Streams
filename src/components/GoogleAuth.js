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

  render() {
    return <div>Google Auth</div>;
  }
}

export default GoogleAuth;

/* 
.init() returns a Promise

*/
