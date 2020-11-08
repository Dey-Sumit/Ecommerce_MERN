import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../types"

const productListInitialState = {
    loading: false,
    products: [],
    error: null
}


export const productListReducer = (state = productListInitialState, action) => {
    const { type, payload } = action

    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                products: []

            }
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload
            }
        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}

const productDetailsInitialState = {
    loading: false,
    product: {
        review: []
    },
    error: null
}


export const productDetailsReducer = (state = productDetailsInitialState, action) => {
    const { type, payload } = action

    switch (type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                product: payload
            }
        case PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case PRODUCT_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: payload
            }
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case PRODUCT_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                product: payload

            }
        case PRODUCT_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: payload
            }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}
