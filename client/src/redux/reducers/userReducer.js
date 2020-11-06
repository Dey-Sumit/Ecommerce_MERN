import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../types"

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



const userDetailsInitialState = {
    user: null,
    loading: false,
    error: null
}

export const userDetailsReducer = (state = userDetailsInitialState, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload
            }
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state
    }
}

const userUpdateProfileInitialState = {
    userInfo: null,
    loading: false,
    success: false,
    error: null
}
export const userUpdateProfileReducer = (state = userUpdateProfileInitialState, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userInfo: payload
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                users: payload
            }
        case USER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state
    }
}