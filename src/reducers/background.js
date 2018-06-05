export default (state = {}, action) => {
    switch (action.type){
      case 'SET_BG':
          return Object.assign({}, state, {
            bgDataURL: action.dataURL
          })
          break;
      default:
            return state;
    }
  };