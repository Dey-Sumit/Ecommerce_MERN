import React from 'react'
import { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import Message from '../../components/message/Message'
import { createOrder } from '../../redux/actions/orderAction'



const PlaceOrderScreen = () => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)
    // calculate Prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = Number(cart.itemsPrice)
        + Number(cart.shippingPrice)
        + Number(cart.taxPrice)

    const { itemsPrice, shippingPrice, taxPrice, totalPrice, shippingAddress, paymentMethod, cartItems } = cart;

    const history = useHistory()
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {

        dispatch(createOrder({
            orderItems: cartItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            shippingAddress,
            paymentMethod
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address : </strong>{' '}
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city} {' '},
        {cart.shippingAddress.postalCode} {' '},
        {cart.shippingAddress.country} {' '},
    </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>{cart.paymentMethod}</strong>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ?
                                <Message>Your Cart is Empty</Message> :
                                (
                                    <ListGroup variant="flush">
                                        {
                                            cart.cartItems.map(item =>
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
                                    <Col>Items</Col>
                                    <Col>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item</Col>
                                    <Col>
                                        ${cart.totalPrice}
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
                                <Button type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen
