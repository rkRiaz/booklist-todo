import * as Types from '../actions/types'

const init = {
    userLoggedIn: false,
    user: {},
    error: {},
}

const userReducer = (state=init, action) => {
    switch(action.type) {
        case Types.SET_USER: {
            return {
                userLoggedIn: Object.keys(action.payload.user).length !== 0,
                user: action.payload.user,
                error: {}
            }
        }
        case Types.SET_USER_ERROR: {
            return {
                ...state,
                error: action.payload.error,
            }
        }

        default: return state
    }
}

export default userReducer