import React from 'react'
import List from './List'

const Dashboard = (props) => {
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

export default Dashboard
