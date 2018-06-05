export default (state = {
  score: 0
}, action) => {
    switch (action.type){
      case 'SET_IMAGE':
          return Object.assign({}, state, {
            image: action.image
          })
          break;
          case 'SET_SCORE':
          return Object.assign({}, state, {
            score: action.score
          })
          break;
      default:
            return state;
    }
  };