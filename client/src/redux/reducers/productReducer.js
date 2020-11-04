import { PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../types"

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
