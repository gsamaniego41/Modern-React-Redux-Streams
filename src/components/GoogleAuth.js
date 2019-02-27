import React from "react";

class GoogleAuth extends React.Component {
  componentDidMount = () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId:
          "1036100617710-l63902et7ppcnemi79gsacb7dane91vu.apps.googleusercontent.com",
        scope: "email"
      });
    });
  };

  render() {
    return <div>Google Auth</div>;
  }
}

export default GoogleAuth;
