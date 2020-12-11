import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/message/Message'

import { getOrdersList } from '../redux/actions/orderAction'

const OrdersListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)

    const { orders, loading, error } = orderList

    // const productDelete = useSelector(state => state.productDelete)
    // const { success } = productDelete

    // const productCreate = useSelector(state => state.productCreate)
    // const { loading: loadingCreate,
    //     error: errorCreate,
    //     product: createdProduct,
    //     success: successCreate } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(getOrdersList())
        } else {
            dispatch(history.push('/login'))
        }
    }, [dispatch, history, userInfo])



    return (
        <>

            <Row className="align-items-center">
                <Col>
                    <h1>Orders</h1>
                </Col>

            </Row>

            {/* {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}

            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(({ _id, user, createdAt, totalPrice, isPaid, delivered }) => (
                                        <tr key={_id}>
                                            <td>{_id}</td>
                                            <td>{user && user.name}</td>
                                            <td>{createdAt.subString(0, 10)}</td>
                                            <td>{totalPrice}</td>
                                            {/* //TODO */}
                                            <td></td>


                                            <td>
                                                <LinkContainer to={`/admin/product/${_id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm'>
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

export default OrdersListScreen
