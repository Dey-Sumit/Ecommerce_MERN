import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../components/formContainer/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/userAction'
import Message from '../../components/message/Message'
import Loader from '../../components/Loader'
import { saveShippingAddress } from '../../redux/actions/cartAction'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'



const ShippingScreen = ({ history }) => {

    const dispatch = useDispatch()
    const { shippingAddress } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')

    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='address'>
                    <Form.Label>address</Form.Label>
                    <Form.Control type='text' placeholder='Enter address'
                        value={address} onChange={e => setAddress(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='City'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter City'
                        value={city} onChange={e => setCity(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control type='nam' placeholder='Enter postalCode'
                        value={postalCode} onChange={e => setPostalCode(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='Country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter Country'
                        value={country} onChange={e => setCountry(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
