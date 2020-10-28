import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Poll extends Component {

    render() {

        const { id, optionOne } = this.props.poll
        const { name, avatarURL } = this.props.user

        return (
            <div className='poll-card'>
                <h3 className='poll-author'>{name} asks:</h3>
                <div className='poll-preview'>
                    <img
                        src={avatarURL}
                        className='avatar'
                        alt={`Avatar of ${name}`}
                    />
                    <div className='poll-info'>
                        <h4>Would You Rather</h4>
                        <h5>{`... ${optionOne.text.split(" ").slice(0, 2).join(' ')} ...`}</h5>
                        <Link to={`/questions/${id}`}>
                            <button className='poll-view-btn'>
                                view poll
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, polls, users }, { id }) {
    const poll = polls[id]
    return {
        poll: poll ? poll : null,
        user: poll ? users[poll.author] : null,
    }
}

export default connect(mapStateToProps)(Poll)