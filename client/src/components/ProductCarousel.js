import React, { useEffect } from "react"
import { Carousel, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getTopProducts } from "../redux/actions/productAction"
import Loader from "./Loader"
import Message from "./message/Message"
const ProductCarousel = () => {
   const dispatch = useDispatch()

   const { loading, error, products } = useSelector(
      state => state.productTopRated
   )
   useEffect(() => {
      dispatch(getTopProducts())
   }, [dispatch])

   return loading ? (
      <Loader />
   ) : error ? (
      <Message variant="danger">{error}</Message>
   ) : (
      <Carousel pause="hover" className="bg-dark">
         {products.map(product => (
            <Carousel.Item key={product._id}>
               <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} />
                  <Carousel.Caption>
                     <h4>
                        {product.name} ({product.price})
                     </h4>
                  </Carousel.Caption>
               </Link>
            </Carousel.Item>
         ))}
      </Carousel>
   )
}

export default ProductCarousel
