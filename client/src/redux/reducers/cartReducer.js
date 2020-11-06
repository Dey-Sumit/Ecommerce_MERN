import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../types"

const initialCart = {
    cartItems: [],
    shippingAddress: {}
}

export const cartReducer = (state = initialCart, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ADD_ITEM:
            const item = payload

            // if the item already exists ; overwrite the qty in cart else all the new product to the array
            const existItem = state.cartItems.find(x => x.productId === item.productId)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.productId === existItem.productId ? item : x)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.productId !== payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload
            }

        default:
            return state
    }
}