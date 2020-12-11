import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import FormContainer from '../../components/formContainer/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message/Message'
import Loader from '../../components/Loader'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import { savePaymentMethod } from '../../redux/actions/cartAction'



const PaymentScreen = ({ history }) => {

    const dispatch = useDispatch()
    const { shippingAddress } = useSelector(state => state.cart)

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal")

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')

    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label as='legend' >
                        Select Method
                    </Form.Label>
                    <Col>
                        <Form.Check type="radio" label="Paypal or Credit Card"
                            id="Paypal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={e => setPaymentMethod(e.method.value)}
                        >
                        </Form.Check>
                        {/* <Form.Check type="radio" label="Stripe (not implemented)"
                        id="Paypal"
                        name="paymentMethod"
                        value="PayPal"
                        checked
                        onChange={e => setPaymentMethod(e.method.value)}
                        >
                        </Form.Check> */}
                    </Col>
                </Form.Group>

                <Button type='submit' >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;
