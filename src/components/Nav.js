import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

function Nav(props) {
    const { authedUser } = props
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/new' >
                        New Poll
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' >
                        Leader Board
                    </NavLink>
                </li>
            </ul>
            <div>
                <p>
                    Hello, {authedUser}
                </p>
                <button>
                    <FontAwesomeIcon className='power' icon={faPowerOff} />
                </button>
            </div>

        </nav>
    )
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(Nav)