import { receiveUsers } from './users'
import { receivePolls } from './polls'
import { setAuthedUser } from './authedUser'
import { _getQuestions, _getUsers } from '../_DATA'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {

        return Promise.all([
            _getUsers(),
            _getQuestions(),
        ]).then(([users, polls]) => ({
            users,
            polls,
        })).then(({users, polls}) => {
            dispatch(receiveUsers(users))
            dispatch(receivePolls(polls))
            dispatch(setAuthedUser(AUTHED_ID))
        })

    }
}


