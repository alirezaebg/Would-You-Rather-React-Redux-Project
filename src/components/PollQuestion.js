import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {handleSaveQuestionAnswer} from '../actions/shared'

class PollQuestion extends Component {

    state = {
        option: ''
    }

    handleChange = (e) => {
        const value = e.target.value
        this.setState(() => ({
            option: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { option } = this.state
        const { id } = this.props.poll

        dispatchEvent(handleSaveQuestionAnswer(id, option))
    }

    render() {

        const { name, avatarURL } = this.props.user
        const { id, optionOne, optionTwo } = this.props.poll
        const { answers } = this.props.authedUser
        

        //find out if the question has been answered or not
        const isAnswered = Object.keys(answers).includes(id)
        //AuthedUser answer to the poll
        const authedUserAnswer = (isAnswered) ? answers[id] : null

        //Get the number of votes for each option and obtain the percentage
        const optionOneVotes = optionOne.votes.length;
        const optionTwoVotes = optionTwo.votes.length;
        const optionOnePercentage = (optionOneVotes * 100) / (optionOneVotes + optionTwoVotes)
        const optionTwoPercentage = (optionTwoVotes * 100) / (optionOneVotes + optionTwoVotes)

        return (
            <div className='poll-card'>
                {isAnswered
                    ? <h3 className='poll-author'> Asked by {name}</h3>
                    : <h3 className='poll-author'>{name} asks:</h3>}
                <div className='poll-preview'>
                    <div className='avatar'>
                        <img
                            src={avatarURL}
                            alt={`Avatar of ${name}`}
                        />
                    </div>
                    {!isAnswered
                        // If it has not been answered show the poll
                        ? <form className='poll-info' onSubmit={this.handleSubmit}>
                            <h4>Would You Rather</h4>
                            <div>
                                <div className='poll-option'>
                                    <input
                                        type='radio'
                                        id='optionOne'
                                        name='poll'
                                        value='optionOne'
                                        onChange={this.handleChange}
                                    />
                                    <label className='radio-btn' htmlFor='optionOne'>{optionOne.text}</label>
                                </div>
                                <div className='poll-option'>
                                    <input
                                        type='radio'
                                        id='optionTwo'
                                        name='poll'
                                        value='optionTwo'
                                        onChange={this.handleChange}
                                    />
                                    <label className='radio-btn' htmlFor='optionTwo'>{optionTwo.text}</label>
                                </div>
                            </div>
                            <button className='poll-view-btn'>
                                submit
                            </button>
                        </form>
                        // If it has been answered, show results
                        : <div className='poll-info'>
                            <h2>Results</h2>
                            <div className='radio'>
                                <div className='result-option'>
                                    <p>Would you rather {optionOne.text}
                                        {'optionOne' === authedUserAnswer
                                            ? <FontAwesomeIcon className='fa' icon={faCheckCircle} />
                                            : ''}
                                    </p>
                                    <div className='progress'>
                                        <div style={{ width: `${optionOnePercentage}%` }}>{optionOnePercentage}%</div>
                                    </div>
                                </div>
                                <div className='result-option'>
                                    <p>Would you rather {optionTwo.text}
                                        {'optionTwo' === authedUserAnswer
                                            ? <FontAwesomeIcon className='fa' icon={faCheckCircle} />
                                            : ''}
                                    </p>
                                    <div className='progress'>
                                        <div style={{ width: `${optionTwoPercentage}%` }}>{optionTwoPercentage}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>

            </div>
        )
    }
}

function mapStateToProps({ authedUser, polls, users }, props) {
    const { question_id } = props.match.params
    const poll = polls[question_id]

    return {
        user: poll ? users[poll.author] : null,  //user who asked the poll
        poll: poll ? poll : null,                //the poll itself
        authedUser: users[authedUser]            //currently logged in user
    }
}

export default connect(mapStateToProps)(PollQuestion)