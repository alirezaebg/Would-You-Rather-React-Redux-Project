import React from 'react'
import { connect } from 'react-redux'

const Leaderboard = (props) => {
    return (
        <div>
            {props.scores.map((member, index) => (
                <div className='leaderboard-card' key={index}>
                    <div className='avatar'>
                        <img
                            src={member.avatarURL}
                            alt={`Avatar of ${member.name}`}
                        />
                    </div>
                    <div className='leaderboard-info'>
                        <h2>{member.name}</h2>
                        <br />
                        <h4>Answered Questions: {member.numOfAnswer}</h4>
                        <br />
                        <h4>Created Questions: {member.numOfQuestion}</h4>
                    </div>
                    <div className='leaderboard-score'>
                        <h4>Score</h4>
                        <br />
                        <h1>{member.score}</h1>
                    </div>
                    <h1 className='banner'>{index + 1}</h1>
                </div>
            ))}
        </div>
    )
}

function mapStateToProps({ users }) {

    //forming an object that has name, numOfAnswer, numOfQuestion and score as its properties
    let scores = Object.keys(users).map((user) => {
        let member = {}
        member.name = users[user].name
        member.avatarURL = users[user].avatarURL
        member.numOfAnswer = Object.keys(users[user].answers).length
        member.numOfQuestion = users[user].questions.length
        member.score = member.numOfAnswer + member.numOfQuestion
        return member
    })

    scores.sort((a, b) => b.score - a.score)

    return {
        scores
    }
}

export default connect(mapStateToProps)(Leaderboard)