import axios from "axios"

import {
   PRODUCT_CREATE_FAIL,
   PRODUCT_CREATE_REQUEST,
   PRODUCT_CREATE_REVIEW_FAIL,
   PRODUCT_CREATE_REVIEW_REQUEST,
   PRODUCT_CREATE_REVIEW_SUCCESS,
   PRODUCT_CREATE_SUCCESS,
   PRODUCT_DELETE_FAIL,
   PRODUCT_DELETE_REQUEST,
   PRODUCT_DELETE_SUCCESS,
   PRODUCT_DETAIL_FAIL,
   PRODUCT_DETAIL_REQUEST,
   PRODUCT_DETAIL_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_TOP_FAIL,
   PRODUCT_TOP_REQUEST,
   PRODUCT_TOP_SUCCESS,
   PRODUCT_UPDATE_FAIL,
   PRODUCT_UPDATE_REQUEST,
   PRODUCT_UPDATE_SUCCESS,
} from "../types"

export const getListProducts = (keyword = "") => async dispatch => {
   try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
      const { data } = await axios.get(`/api/v1/products?keyword=${keyword}`)

      dispatch({
         type: PRODUCT_LIST_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getTopProducts = () => async dispatch => {
   try {
      dispatch({ type: PRODUCT_TOP_REQUEST })
      const { data } = await axios.get("/api/v1/products/top")

      dispatch({
         type: PRODUCT_TOP_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_TOP_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const getProductDetails = id => async dispatch => {
   console.log(id)
   try {
      dispatch({ type: PRODUCT_DETAIL_REQUEST })

      const { data } = await axios.get(`/api/v1/products/${id}`)

      dispatch({
         type: PRODUCT_DETAIL_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: PRODUCT_DETAIL_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const deleteProduct = id => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_DELETE_REQUEST })
      const { userInfo } = getState().userLogin
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }
      const { data } = await axios.delete(`/api/v1/products/${id}`, config)
      dispatch({
         type: PRODUCT_DELETE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: PRODUCT_DELETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const createProduct = () => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_CREATE_REQUEST })
      const { userInfo } = getState().userLogin
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }
      const { data } = await axios.post(`/api/v1/products/`, {}, config)
      dispatch({
         type: PRODUCT_CREATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: PRODUCT_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const updateProduct = product => async (dispatch, getState) => {
   try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST })
      const { userInfo } = getState().userLogin
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }
      const { data } = await axios.put(
         `/api/v1/products/${product._id}`,
         product,
         config
      )
      dispatch({
         type: PRODUCT_UPDATE_SUCCESS,
         payload: data,
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: PRODUCT_UPDATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
export const createProductReview = (productId, review) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
      const { userInfo } = getState().userLogin
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      }
      await axios.post(`/api/v1/products/${productId}/reviews`, review, config)

      dispatch({
         type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: PRODUCT_CREATE_REVIEW_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}
