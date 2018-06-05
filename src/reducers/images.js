export default (state = {}, action) => {
    switch (action.type){
      case 'SAVE':
          return Object.assign({}, state, action.images)
          break;
      case 'SET_BG':
          return Object.assign({}, state, {
            bgDataURL: action.dataURL
          })
          break;
      default:
            return state;
    }
  };