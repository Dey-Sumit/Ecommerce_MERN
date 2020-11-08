import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../components/formContainer/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message/Message'
import Loader from '../../components/Loader'

const UserEditScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const user = useSelector(state => state.userDetails)
    const { loading, error, userInfo } = user


    useEffect(() => {

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()


    }
    return (
        <>
            <Link to='/admin/userList' className="btn btn-light my-3">
                Back
            </Link>

            <FormContainer>
                <h1>Update User Details</h1>

                {message && <Message variant='danger' >{message}</Message>}
                {error && <Message variant='danger' >{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
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

                    <Form.Group controlId='admin'>
                        <Form.Check type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={e => setIsAdmin(e.target.value)} >
                        </Form.Check>
                    </Form.Group>


                    <Button type='submit' variant='primary'>Update</Button>

                </Form>
            </FormContainer>
        </>
    )
}

export default UserEditScreen
