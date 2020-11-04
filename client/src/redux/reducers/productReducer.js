import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../types"

const initialState = {
    loading: false,
    products: [],
    error: null
}


export const productReducer = (state = initialState, action) => {
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