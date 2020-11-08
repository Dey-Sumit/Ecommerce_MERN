import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/message/Message'
import { deleteUser, listUsers } from '../../redux/actions/userAction'

const UserListScreen = ({ history }) => {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { users, loading, error } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])


    const deleteHandler = (_id) => {
        dispatch(deleteUser(_id))
    }
    return (
        <>
            <h1>Users</h1>

            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(({ _id, name, email, isAdmin }) => (
                                        <tr key={_id}>
                                            <td>{_id}</td>
                                            <td>{name}</td>
                                            <td><a href={`mailto:${email}`}>{email}</a></td>
                                            <td>{isAdmin ? (
                                                <i className="fas fa-check" style={{ color: 'green' }}></i>
                                            ) :
                                                <i className="fas fa-times" style={{ color: 'red' }}></i>
                                            }</td>

                                            <td>
                                                <LinkContainer to={`/admin/user/${_id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(_id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )


            }
        </>
    )
}

export default UserListScreen
