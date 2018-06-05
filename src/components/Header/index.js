import React, { Component } from 'react'
import { createImage, getRandomImage } from '../../dataUtils'
import { connect } from 'react-redux'
import * as backgroundActions from '../../actions/background'
import { setImage } from '../../actions/level'
import { Stage, Layer, Image } from 'react-konva'
import './styles.scss'
class Canvas extends Component{
    constructor(props){
        super(props)
    }

    render = () => {
        return (
        <div className="header">
        <span className="about">
       Masterpiece
       </span>
       <span className="score">
       Score: {this.props.score}
       </span>
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        score: state.level.score
    } 
}
const mapDispatchToProps = (dispatch) => {
    return {
      setBg: (dataURL) => dispatch(backgroundActions.set(dataURL)),
      reloadImage: () => dispatch(setImage(getRandomImage()))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Canvas)