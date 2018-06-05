import React, {Component} from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { configureGame } from './configureGame'
import { getRandomImage } from './dataUtils'
import { setImage } from './actions/level'
import './index.scss'
// import Question from './components/Question'

import App from './App'


 configureGame().then(store => {
     store.dispatch(setImage(getRandomImage()))
    render(<Provider store={store}><App/></Provider>, document.getElementById('app'))
 })
