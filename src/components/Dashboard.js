import React, { Component } from 'react'
import List from './List'
import Login from './Login'
import { connect } from 'react-redux'
import Poll from './Poll'

//Stateless functional component
class Dashboard extends Component {

    render() {

        const { authedUser } = this.props
        return (
            <div>
                {authedUser === null
                ? 
                <List>
                    <div label="Unanswered Polls">
                        {this.props.unansweredPollIds.map((id) => (
                            <Poll id={id} key={id} />
                        ))}
                    </div>
                    <div label="Answered Polls">
                        {this.props.answeredPollIds.map((id) => (
                            <Poll id={id} key={id} />
                        ))}
                    </div>
                </List >
                : <Login /> }
            </div>

        )
    }
}

function mapStateToProps({ authedUser, polls, users }) {

    //answered polls Ids by authedUser
    let answeredPollIds = authedUser ? Object.keys(users[authedUser].answers) : null
    answeredPollIds = answeredPollIds.sort((a, b) => polls[b].timestamp - polls[a].timestamp)
    //unanswered polls Ids
    let unansweredPollIds = authedUser ? Object.keys(polls).filter((poll) => {
        return !answeredPollIds.includes(poll)
    }) : null
    unansweredPollIds = unansweredPollIds.sort((a, b) => polls[b].timestamp - polls[a].timestamp)
    console.log('here')
    return {
        answeredPollIds,
        unansweredPollIds,
        authedUser,
    }
}

export default connect(mapStateToProps)(Dashboard)
