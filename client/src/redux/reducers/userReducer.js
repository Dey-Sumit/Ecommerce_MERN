import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../types"

const userInitialState = {
    userInfo: null,
    loading: false,
    error: null
}

export const userLoginReducer = (state = userInitialState, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: payload
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                userInfo: null,
                error: payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                userInfo: null
            }
        default:
            return state
    }
}


export const userRegisterReducer = (state = userInitialState, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: payload
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                userInfo: null,
                error: payload
            }

        default:
            return state
    }
}
