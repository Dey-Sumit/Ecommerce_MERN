import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/message/Message'
import { addToCart, removeFromCart } from '../../redux/actions/cartAction'


const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId)
            dispatch(addToCart(productId, qty))
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkOutHandler = () => {
        history.push('/login/?redirect=shipping')
    }

    return (
        <>
            <h1>Shopping Cart</h1>
            <Row>

                <Col md={8}>

                    {cartItems.length === 0 ? <Message>Your Cart is empty
                    <Link to='/'>Go Back</Link>
                    </Message> : <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.productId}>
                                    <Row>

                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={2}>
                                            <Link to={`/product/${item.product}`}>Go Back</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}><Form.Control as='select' value={item.qty} onChange={e => dispatch(addToCart(item.productId, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>)
                                            }
                                        </Form.Control></Col>
                                        <Col md={2}>
                                            <Button type='button' variant="light" onClick={() => removeFromCartHandler(item.productId)}>
                                                <i className="fas fa-trash"></i>

                                            </Button>
                                        </Col>





                                    </Row>

                                </ListGroup.Item>
                            ))}
                        </ListGroup>}
                </Col>
                <Col md={4}>
                    <Card >
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="Item p-2" >
                                <h3>
                                    Subtotal
                                ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            </h3>
                                <h4>
                                    ${cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2)}
                                </h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-black' disabled={cartItems.length === 0} onClick={checkOutHandler}>Proceed to Checkout</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen
