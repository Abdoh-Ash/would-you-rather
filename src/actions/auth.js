// ACTION CONSTANTS
const SIGN_IN = 'SIGN_IN';

// ACTION CREATORS
function createSignInAction(userID) {
  return {
    type: SIGN_IN,
    userID
  };
}

// EXPORTS
export {SIGN_IN, createSignInAction};
