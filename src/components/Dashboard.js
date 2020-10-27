import React from 'react'
import List from './List'
import { connect } from 'react-redux'

const Dashboard = (props) => {
    console.log(props)
    return (
        <List>
            <div label="Unanswered Polls">
                See ya later, <em>Alligator</em>!
            </div>
            <div label="Answered Polls">
                After 'while, <em>Crocodile</em>!
            </div>
        </List>
    )
}

function mapStateToProps({ polls }) {
    return {
        pollIds: Object.keys(polls)
            .sort((a, b) => polls[b].timestamp - polls[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)
