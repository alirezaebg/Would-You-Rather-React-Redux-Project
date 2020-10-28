import React from 'react'
import List from './List'
import { connect } from 'react-redux'
import Poll from './Poll'

//Stateless functional component
const Dashboard = (props) => {
    return (
        <List>
            <div label="Unanswered Polls">
                {props.unansweredPollIds.map((id) => (
                        <Poll id={id} />
                ))}
            </div>
            <div label="Answered Polls">
                {props.answeredPollIds.map((id) => (
                        <Poll id={id} />
                ))}
            </div>
        </List >
    )
}

function mapStateToProps({ authedUser, polls, users }) {

    //answered polls Ids by authedUser
    const answeredPollIds = authedUser ? Object.keys(users[authedUser].answers) : null
    //unanswered polls Ids
    const unansweredPollIds = authedUser ? Object.keys(polls).filter((poll) => {
        return !answeredPollIds.includes(poll)
    }) : null

    return {
        answeredPollIds,
        unansweredPollIds
    }
}

export default connect(mapStateToProps)(Dashboard)
