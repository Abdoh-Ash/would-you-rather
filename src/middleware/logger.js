// EXPORTS
export default function logger(store) {
  return function (next) {
    return function (action) {
      console.group();
      console.log('The action:', action);
      console.log('The previous state:', store.getState());
      next(action);
      console.log('The following state:', store.getState());
      console.groupEnd();
    };
  };
}
