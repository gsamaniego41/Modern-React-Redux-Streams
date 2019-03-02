const INITIAL_STATE = {
  // all caps to tell other devs that this is a constant
  // should never change
  isSignedIn: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {...state, isSignedIn: true};
    case "SIGN_OUT":
      return {...state, isSignedIn: false};
    default:
      return state;
  }
};
