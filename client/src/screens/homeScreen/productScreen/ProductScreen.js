import React, { useEffect, useState } from "react"
import { Col, Row, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Loader from "../../../components/Loader"
import Message from "../../../components/message/Message"
import Meta from "../../../components/Meta"
import Rating from "../../../components/rating/Rating"
import { getProductDetails } from "../../../redux/actions/productAction"

const ProductScreen = ({ history, match }) => {
   const [qty, setQty] = useState(1)

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getProductDetails(match.params.id))
   }, [dispatch, match])

   const productDetails = useSelector(state => state.productDetails)
   const { loading, error, product } = productDetails
   const {
      image,
      name,
      numReviews,
      rating,
      countInStock,
      description,
      price,
   } = product

   const productReviewCreate = useSelector(state => state.productReviewCreate)
   const {
      success: successProductReview,
      error: erroProducrReview,
   } = productDetails

   const addToCartHandler = e => {
      e.preventDefault()
      history.push(`/cart/${match.params.id}?qty=${qty}`)
   }

   return (
      <>
         <Meta title={name} />
         <Link className="btn btn-light my-3" to="/">
            Go Back
         </Link>

         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message>
         ) : (
            <Row>
               <Col md={6}>
                  <Image src={image} alt={name} fluid />
               </Col>
               <Col md={3}>
                  <ListGroup variant="flush">
                     <ListGroup.Item>
                        <h3>{name}</h3>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Rating
                           color="yellow"
                           value={rating}
                           text={`${numReviews} reviews`}
                        />
                     </ListGroup.Item>
                     <ListGroup.Item>Price : ${price}</ListGroup.Item>
                     <ListGroup.Item>
                        Description : {description}
                     </ListGroup.Item>
                  </ListGroup>
               </Col>

               <Col md={3}>
                  <Card>
                     <ListGroup variant="flush">
                        <ListGroup.Item>
                           <Row>
                              <Col>Price</Col>
                              <Col>
                                 <strong>{`$ ${price}`}</strong>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Status</Col>
                              <Col>
                                 {countInStock > 0
                                    ? "In Stock"
                                    : "Out of Stock"}
                              </Col>
                           </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                           <ListGroup.Item>
                              <Row>
                                 <Col>Qty</Col>
                                 <Col>
                                    <Form.Control
                                       as="select"
                                       value={qty}
                                       onChange={e => setQty(e.target.value)}>
                                       {[
                                          ...Array(product.countInStock).keys(),
                                       ].map(x => (
                                          <option key={x + 1} value={x + 1}>
                                             {x + 1}
                                          </option>
                                       ))}
                                    </Form.Control>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                           <Button
                              className="btn-block"
                              type="button"
                              disabled={countInStock === 0}
                              onClick={addToCartHandler}>
                              Add to Cart
                           </Button>
                        </ListGroup.Item>
                     </ListGroup>
                  </Card>
               </Col>
            </Row>
         )}
      </>
   )
}

export default ProductScreen
