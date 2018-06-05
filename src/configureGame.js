import { createStore } from 'redux'
import rootReducer from './reducers'
import data from './data.json'
import * as imagesActions from './actions/images'

const images = require('./assets/*.jpg')

export const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState)
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    });
  }
  return store
}
const loadImages = (store) => {
  store.dispatch(imagesActions.saveToStore(images))
  // Object.values(images).forEach((path, i) => {
  //   let progress = ((i+1)/images.length) * 100
  //   game.load.image(path)
  //   FBInstant.setLoadingProgress(progress);
  // })
}
export const configureGame = async () => {
  const store = configureStore()
  loadImages(store)
  // await FBInstant.initializeAsync()
  // loadImages()
  // await FBInstant.startGameAsync()
  return store
}
export const assets = () => console.log(images)
