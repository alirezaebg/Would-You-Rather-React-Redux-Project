import React, { Component } from 'react'
import List from './List'
import { connect } from 'react-redux'
import Poll from './Poll'

//Stateless functional component
class Dashboard extends Component {

    render() {

        return (
            <div>
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
            </div>

        )
    }
}

function mapStateToProps({ authedUser, polls, users }) {

    //answered polls Ids by authedUser
    let answeredPollIds = authedUser ? Object.keys(users[authedUser].answers) : null
    answeredPollIds = answeredPollIds
        ? answeredPollIds.sort((a, b) => polls[b].timestamp - polls[a].timestamp)
        : null
    //unanswered polls Ids
    let unansweredPollIds = authedUser ? Object.keys(polls).filter((poll) => {
        return !answeredPollIds.includes(poll)
    }) : null
    unansweredPollIds = unansweredPollIds
        ? unansweredPollIds.sort((a, b) => polls[b].timestamp - polls[a].timestamp)
        : null

    return {
        answeredPollIds,
        unansweredPollIds,
        authedUser,
    }
}

export default connect(mapStateToProps)(Dashboard)
