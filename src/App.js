import React, { Component, Fragment } from 'react'
import Canvas from './components/Canvas'
import { connect } from 'react-redux'
import './App.scss'
import Question from './components/Question'
import Header from './components/Header'
class App extends Component{
    constructor(props){
        super(props)
    }
    render = () => {
     return (
         <div className="screen" style={{backgroundImage: `url('${this.props.bgDataURL}')`}}>
        <Header />
        <div className="bottom-wrapper">
             <Canvas />
             <Question />
             </div>
        </div>
     )
    }
}
const mapStateToProps = state => {
    console.log(state) 
    return {
        bgDataURL: state.background.bgDataURL
    } 
}
export default connect(mapStateToProps, null)(App)
