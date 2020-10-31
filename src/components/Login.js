import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../pic.jpeg'

class Login extends Component {
    render() {
        return (
            <div className='login'>
                <h2>Sign in</h2>
                <div>
                    <img src={logo} alt='WUR logo' />
                </div>
                <form className='loginForm'>
                    <select>
                        <option value='sarahedo'>Sarah Edo</option>
                        <option value='tylermcginnis'>Tyler McGinnis</option>
                        <option value='johndoe'>John Doe</option>
                    </select>
                    <button type='submit'>
                        sign in
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(Login)