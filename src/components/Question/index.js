import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getRandomImage } from '../../dataUtils'
import { setImage, setScore, increaseScore } from '../../actions/level'
import './styles.scss'
const  generateAnswer = (image, right) => {
    return {
        right,
        title: (
            <Fragment>
             {image.title}
             <span>{`${image.name} ${image.surname}`}</span>
            </Fragment>
        )
    }
}

class Question extends Component{
    constructor(props){
        super(props)
        this.state = {
            answers: []
        }
        }
       
        static getDerivedStateFromProps (props, state) {
            let getAnswers = () => [
                generateAnswer(getRandomImage(), false),
                generateAnswer(props.image, true),
                generateAnswer(getRandomImage(), false)
            ]
            let answers = getAnswers()
            while(answers[0] == answers[1] || answers[1] == answers[2] || answers[0] == answers[2]){
                answers == getAnswers()
            }
            return { 
                answers
            }
          }
handleAnswer = (right) => {
    if(right){
        this.props.increaseScore(this.props.score)
        console.log(this.props.score)
    }else{
        this.props.fail()
    }
    this.props.reloadImage()
}
    render = () => {
        return (<div>
            <h1>Jaki to obraz?</h1>
            {this.state.answers.map((answer, i) => {
                return (
                    <div key={i} className="answer" onClick={this.handleAnswer.bind(this, answer.right)}>
                    {answer.title}
                    </div>
                )
            })}
            </div>)
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      image: state.level.image,
      score: state.level.score
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      increaseScore: (currentScore) => dispatch(increaseScore(currentScore)),
      fail: () => dispatch(setScore(0)),
      reloadImage: () => dispatch(setImage(getRandomImage()))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Question);