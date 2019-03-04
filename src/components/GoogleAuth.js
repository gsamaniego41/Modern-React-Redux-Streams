import React from "react";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount = () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1036100617710-l63902et7ppcnemi79gsacb7dane91vu.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          // when we finish initializing our library
          // 1. assign aut instance to this.auth
          this.auth = window.gapi.auth2.getAuthInstance();

          // this.setState({isSignedIn: this.auth.isSignedIn.get()})
          // to get auth status when we first initialize our library
          // and update the auth state to be w/e its value should be

          // 2. immediately update auth state inside our redux store
          this.onAuthChange(this.auth.isSignedIn.get());
          // 3. sit and wait for auth status to change at some point in the future
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  };

  onAuthChange = isSignedIn => {
    // will be called any time the user's auth status changes
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    // we want to access our auth instance
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {isSignedIn: state.auth.isSignedIn};
};

export default connect(
  mapStateToProps,
  {signIn, signOut}
)(GoogleAuth);

/* 
.init() returns a Promise
window.gapi.getAuthInstance().signIn()
window.gapi.getAuthInstance().signOut()

Auth Component
1. Get a reference to the 'auth' object after it is initialized
2. Figure out if the user is currently signed in
3. Print their authentication status on screen
*/
