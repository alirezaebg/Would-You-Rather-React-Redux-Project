export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const UPDATE_POLL_ANSWER = 'UPDATE_POLL_ANSWER'

export function receivePolls(polls) {
    return {
        type: RECEIVE_POLLS,
        polls,
    }
}

export function updatePollAnswer({ authedUser, qid, answer }) {
    return {
        type: UPDATE_POLL_ANSWER,
        authedUser,
        qid,
        answer,
    }
}