import React from 'react'
import { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import Loader from '../../components/Loader'
import Message from '../../components/message/Message'
import { createOrder, getOrderDetails } from '../../redux/actions/orderAction'



const OrderScreen = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    const { order, loading, error } = useSelector(state => state.orderDetails)

    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

    // calculate Prices
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100)
    order.taxPrice = addDecimals(Number((0.15 * order.itemsPrice).toFixed(2)))

    order.totalPrice = Number(order.itemsPrice)
        + Number(order.shippingPrice)
        + Number(order.taxPrice)


    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [id, dispatch])


    return loading ?
        <Loader /> : error ? <Message variant="danger">{error}</Message>
            : <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p> <strong>Name :  </strong> {order.user.name}</p>
                                <p>
                                    <strong>Email : </strong>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address : </strong>{' '}
                                    {order.shippingAddress.address},{' '}
                                    {order.shippingAddress.city} {' '},
                                {order.shippingAddress.postalCode} {' '},
                                {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ?
                                    <Message variant="success">Delivered on {order.DeliveredAt}</Message>
                                    :
                                    <Message variant="danger">Not Delivered</Message>
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method : </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ?
                                    <Message variant="success">Paid on {order.paidAt}</Message>
                                    :
                                    <Message variant="danger">Not Paid</Message>

                                }
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ?
                                    <Message>Your Order is Empty</Message> :
                                    (
                                        <ListGroup variant="flush">
                                            {
                                                order.orderItems.map(item =>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.productId}`}>
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                )
                                            }
                                        </ListGroup>
                                    )

                                }
                            </ListGroup.Item>
                        </ListGroup>


                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>ItemsPrice</Col>
                                        <Col>
                                            ${order.itemsPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>TaxPrice</Col>
                                        <Col>
                                            ${order.taxPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>
                                            ${order.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    {error &&
                                        <Message variant="danger">
                                            {error}
                                        </Message>}
                                </ListGroup.Item>


                                <ListGroup.Item>
                                    {/* <Button type="button"
                                    className="btn-block"
                                    disabled={order.orderItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button> */}
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>

}

export default OrderScreen
