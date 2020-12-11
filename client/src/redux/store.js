import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import {
   productListReducer,
   productDetailsReducer,
   productDeleteReducer,
   productCreateReducer,
   productUpdateReducer,
   productCreateReviewReducer,
   productTopRatedReducer,
} from "./reducers/productReducer"
import { cartReducer } from "./reducers/cartReducer"
import {
   userDeleteReducer,
   userDetailsReducer,
   userListReducer,
   userLoginReducer,
   userRegisterReducer,
   userUpdateProfileReducer,
} from "./reducers/userReducer"
import {
   orderCreateReducer,
   orderDetailsReducer,
   ordersListReducer,
} from "./reducers/orderReducer"

const rootReducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailsReducer,
   productDelete: productDeleteReducer,
   productCreate: productCreateReducer,
   productUpdate: productUpdateReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userDetails: userDetailsReducer,
   userUpdateProfile: userUpdateProfileReducer,
   userList: userListReducer,
   userDelete: userDeleteReducer,
   orderCreate: orderCreateReducer,
   orderDetails: orderDetailsReducer,
   orderList: ordersListReducer,
   productCreateReview: productCreateReviewReducer,
   productTopRated: productTopRatedReducer,
})

const cartItemsFromStorage = localStorage.getItem("cartItems")
   ? JSON.parse(localStorage.getItem("cartItems"))
   : []

const userInfoFromStorage = localStorage.getItem("userInfo")
   ? JSON.parse(localStorage.getItem("userInfo"))
   : null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
   ? JSON.parse(localStorage.getItem("shippingAddress"))
   : {}

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
   ? JSON.parse(localStorage.getItem("paymentMethod"))
   : null

const initialState = {
   cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
      paymentMethod: paymentMethodFromStorage,
   },
   userLogin: {
      userInfo: userInfoFromStorage,
   },
}

const middleWare = [thunk]

const store = createStore(
   rootReducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleWare))
)
export default store
