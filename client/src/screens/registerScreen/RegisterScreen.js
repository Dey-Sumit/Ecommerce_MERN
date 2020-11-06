import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../components/formContainer/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/userAction'
import Message from '../../components/message/Message'
import Loader from '../../components/Loader'

const RegisterScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const user = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = user

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match')
            return
        }
        dispatch(register(name, email, password))

    }
    return (
        <FormContainer>
            <h1>Sign In</h1>

            {message && <Message variant='danger' >{message}</Message>}
            {error && <Message variant='danger' >{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='name'>
                    <Form.Label>name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name'
                        value={name} onChange={e => setName(e.target.value)} >
                    </Form.Control>
                </Form.Group>

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
                <Form.Group controlId='Confirm Password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password again'
                        value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Register</Button>

                <Row className="py-3">
                    <Col>
                        Already have an account?
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            {" "} Login Here
                        </Link>
                    </Col>
                </Row>


            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
