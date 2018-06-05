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
        this.state = {
            x: 0,
            y:0,
            imageSize: null,
            image: new window.Image()
        }
    }
  componentDidUpdate = (prevProps) => {
      console.log('score', this.props.score)
      if(prevProps.image != this.props.image){
        this.props.setBg(this.imageNode.getStage().toDataURL())
        let image = this.state.image
        image.src = this.props.images[this.props.image.img]
        image.onload = () => this.forceUpdate(() => {
            this.positionImage(1 + this.props.score*0.2)
            })
    this.setState({image})
      }
  }
    componentDidMount = () => {
        this.state.image.src = this.props.images[this.props.image.img]
        this.state.image.onload = () => this.forceUpdate(() => {
            this.positionImage(1 + this.props.score*0.2)
            })
            this.state.image.onerror = this.state.image.onabort = this.props.reloadImage 
    } 
    positionImage = (size) => {
        let random = (max) => Math.floor(Math.random() * (max + 1))
        let canvasSize = window.innerWidth / 1.5
        let { height, width } = this.state.image
        let maxX = canvasSize - width
        let maxY = canvasSize - height
        let imageWidth = width * size
        let imageHeight = height * size
console.log({maxX, width, height, maxY, canvasSize})
        this.setState({
            x:random(maxX),
            y:random(maxY),
            imageWidth,
            imageHeight
        }, () => {
            this.props.setBg(this.imageNode.getStage().toDataURL())
        })
    }

    render = () => {
        console.log(this.props)
        return (
        <div className="canvas-wrapper">
        <Stage width={window.innerWidth / 1.5} height={window.innerWidth / 1.5} ref={node => this.imageNode = node}>
        <Layer>
        <Image 
        x={this.state.x}
        y={this.state.y}
        width={this.state.imageWidth}
        height={this.state.imageHeight}
        image={this.state.image} />
        </Layer> 
      </Stage>
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        score: state.level.score,
        images: state.images,
        image: state.level.image
    } 
}
const mapDispatchToProps = (dispatch) => {
    return {
      setBg: (dataURL) => dispatch(backgroundActions.set(dataURL)),
      reloadImage: () => dispatch(setImage(getRandomImage()))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Canvas)