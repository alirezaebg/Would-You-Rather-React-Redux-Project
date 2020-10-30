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
                        <Poll id={id} key={id}/>
                ))}
            </div>
            <div label="Answered Polls">
                {props.answeredPollIds.map((id) => (
                        <Poll id={id} key={id}/>
                ))}
            </div>
        </List >
    )
}

function mapStateToProps({ authedUser, polls, users }) {

    //answered polls Ids by authedUser
    let answeredPollIds = authedUser ? Object.keys(users[authedUser].answers) : null
    answeredPollIds = answeredPollIds.sort((a,b) => polls[b].timestamp - polls[a].timestamp)
    //unanswered polls Ids
    let unansweredPollIds = authedUser ? Object.keys(polls).filter((poll) => {
        return !answeredPollIds.includes(poll)
    }) : null
    unansweredPollIds = unansweredPollIds.sort((a,b) => polls[b].timestamp - polls[a].timestamp)

    return {
        answeredPollIds,
        unansweredPollIds
    }
}

export default connect(mapStateToProps)(Dashboard)
