import { combineReducers } from 'redux'
import autheUser from './autherUser'
import polls from './polls'
import users from './users'

export default combineReducers({
    polls,
    users,
    autheUser,
}) 