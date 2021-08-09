// ACTION CONSTANTS
const SIGN_IN = 'SIGN_IN';

// ACTION CREATORS
function createSignInAction(user) {
  return {
    type: SIGN_IN,
    user
  };
}

// EXPORTS
export {SIGN_IN, createSignInAction};
