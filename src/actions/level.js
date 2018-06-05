export const newLevel = (images) => {
    return {
      type: 'SAVE',
      images
    }
  }
  export const setImage = (image) => {
    console.log(image)
    return {
      type: 'SET_IMAGE',
      image
    }
  }
  export const increaseScore = (currentScore) => {
    let score = currentScore + 1
    console.log(currentScore)
    return {
      type: 'SET_SCORE',
      score
    }
  }
  export const setScore = (score) => {
    return {
      type: 'SET_SCORE',
      score
    }
  }