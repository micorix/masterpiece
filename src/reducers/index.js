import { combineReducers } from 'redux'

import images from './images'
import level from './level'
import background from './background'

export default combineReducers({
    images,
    background,
    level
})