import { RECEIVE_POLLS, UPDATE_POLL_ANSWER } from '../actions/polls'

export default function polls(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POLLS:
            return {
                ...state,
                ...action.polls
            }
        case UPDATE_POLL_ANSWER:
            return {
                ...state,
                [action.qid]: {
                  ...state[action.qid],
                  [action.answer]: {
                    ...state[action.qid][action.answer],
                    votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                  }
                }
            }
        default:
            return state
    }
}