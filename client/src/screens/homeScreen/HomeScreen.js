import React, { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Loader from "../../components/Loader"
import Message from "../../components/message/Message"
import Meta from "../../components/Meta"
import Product from "../../components/product/Product"
import ProductCarousel from "../../components/ProductCarousel"
import { getListProducts } from "../../redux/actions/productAction"
const HomeScreen = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const { keyword } = useParams()
   const productList = useSelector(state => state.productList)
   const { loading, products, error } = productList
   console.log(params)
   useEffect(() => {
      dispatch(getListProducts(keyword))
   }, [dispatch, keyword])

   return (
      <>
         <Meta />
         {!keyword ? <ProductCarousel /> : <Link to="/" className="btn" />}
         <h1>Latest Product</h1>

         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message>
         ) : (
            <Row>
               {products.map(product => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                     <Product product={product} />
                  </Col>
               ))}
            </Row>
         )}
      </>
   )
}

export default HomeScreen
