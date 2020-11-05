import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../components/formContainer/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/userAction'
import Message from '../../components/message/Message'
import Loader from '../../components/Loader'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const user = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = user

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))

    }
    return (
        <FormContainer>
            <h1>Sign In</h1>

            {error && <Message variant='danger' >{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email'
                        value={email} onChange={e => setEmail(e.target.value)} >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password'
                        value={password} onChange={e => setPassword(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>

                <Row className="py-3">
                    <Col>
                        New Customer?
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            {" "} Register Here</Link>
                    </Col>
                </Row>


            </Form>
        </FormContainer>
    )
}

export default LoginScreen
