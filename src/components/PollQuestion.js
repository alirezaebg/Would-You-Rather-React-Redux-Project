import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { handleSaveQuestionAnswer } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class PollQuestion extends Component {

    state = {
        answer: ''
    }

    handleChange = (e) => {
        const value = e.target.value
        this.setState(() => ({
            answer: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { answer } = this.state
        const { id } = this.props.poll
        const { dispatch } = this.props

        if (answer !== '') dispatch(handleSaveQuestionAnswer(id, answer))

        this.setState(() => ({  //to prevent from transfering the same answer for the same user multiple times
            answer: ''
        }))
    }

    render() {

        if (this.props.wrongID === true) {
            return <Redirect to='/questions/wrong_id' />;
        }

        const { name, avatarURL } = this.props.user
        const { id, optionOne, optionTwo } = this.props.poll
        const { answers } = this.props.loggedin



        //find out if the question has been answered or not
        const isAnswered = Object.keys(answers).includes(id)
        //AuthedUser answer to the poll
        const authedUserAnswer = (isAnswered) ? answers[id] : null

        //Get the number of votes for each option and obtain the percentage
        const optionOneVotes = optionOne.votes.length;
        const optionTwoVotes = optionTwo.votes.length;
        const optionOnePercentage = ((optionOneVotes * 100) / (optionOneVotes + optionTwoVotes)).toFixed(1)
        const optionTwoPercentage = ((optionTwoVotes * 100) / (optionOneVotes + optionTwoVotes)).toFixed(1)

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
                            <button
                                className='poll-view-btn'
                                type='submit'
                            >
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
                                        <div style={{ width: `${optionOnePercentage}%` }}>
                                            {optionOnePercentage > 0 ? `${optionOnePercentage}%` : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className='result-option'>
                                    <p>Would you rather {optionTwo.text}
                                        {'optionTwo' === authedUserAnswer
                                            ? <FontAwesomeIcon className='fa' icon={faCheckCircle} />
                                            : ''}
                                    </p>
                                    <div className='progress'>
                                        <div style={{ width: `${optionTwoPercentage}%` }}>
                                            {optionTwoPercentage > 0 ? `${optionTwoPercentage}%` : ''}
                                        </div>
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
    const wrongID = poll ? false : true

    return {
        user: poll ? users[poll.author] : null,  //user who asked the poll
        poll: poll ? poll : null,                //the poll itself
        wrongID,
        loggedin: authedUser                   //currently logged in user
            ? users[authedUser]
            : null
    }
}

export default connect(mapStateToProps)(PollQuestion)