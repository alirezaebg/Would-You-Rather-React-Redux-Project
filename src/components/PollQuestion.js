import React, { Component } from 'react'
import { connect } from 'react-redux'

class PollQuestion extends Component {
    
    render() {
        console.log(this.props)
        return (
            <div>
                Question
            </div>
        )
    }
}

function mapStateToProps({ authedUser, polls, users }, props) {
    const { id } = props.match.params
    const poll = polls[id]

    return {
        user: poll ? users[poll.author] : null,
        poll: poll ? poll : null
    }
}

export default connect(mapStateToProps)(PollQuestion)