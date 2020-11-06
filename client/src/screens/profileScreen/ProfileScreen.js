import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../redux/actions/userAction'
import Message from '../../components/message/Message'
import Loader from '../../components/Loader'
import { updateUserProfile } from '../../redux/actions/userAction'

//TODO !refractor this file
const ProfileScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile



    useEffect(() => {
        if (!userInfo?.token) {
            history.push('/login')
        } else {
            dispatch(getUserDetails('profile'))
            setEmail(user?.email)
            setName(user?.name)
        }
    }, [history, userInfo?.token, user?.email, user?.name, dispatch])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match')
            return
        }
        dispatch(updateUserProfile({ id: userInfo._id, name, email, password }))

    }
    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>

                {message && <Message variant='danger' >{message}</Message>}
                {error && <Message variant='danger' >{error}</Message>}
                {success && <Message variant='success' >Profile updated!</Message>}
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
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>

            </Col>
            <Col md={9}>
                <h3>My Order</h3>
            </Col>
        </Row>
    )
}

export default ProfileScreen
