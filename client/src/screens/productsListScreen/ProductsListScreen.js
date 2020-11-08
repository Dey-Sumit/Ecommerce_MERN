import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/message/Message'
import { createProduct, deleteProduct, getListProducts } from '../../redux/actions/productAction'
import { PRODUCT_CREATE_RESET } from '../../redux/types'

const ProductsListScreen = ({ history }) => {

    const dispatch = useDispatch()
    const productsList = useSelector(state => state.productList)
    const { products, loading, error } = productsList

    const productDelete = useSelector(state => state.productDelete)
    const { success } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate,
        error: errorCreate,
        product: createdProduct,
        success: successCreate } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(getListProducts())
        }
    }, [dispatch, history, userInfo, success, successCreate])


    const deleteHandler = (_id) => {
        dispatch(deleteProduct(_id))
    }
    const createProductHandler = (product) => {
        dispatch(createProduct())
    }
    return (
        <>

            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus mr-2"></i>Create Product
                    </Button>
                </Col>

            </Row>

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(({ _id, name, price, category, brand }) => (
                                        <tr key={_id}>
                                            <td>{_id}</td>
                                            <td>{name}</td>
                                            <td>{price}</td>
                                            <td>{category}</td>
                                            <td>{brand}</td>


                                            <td>
                                                <LinkContainer to={`/admin/product/${_id}/edit`}>
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

export default ProductsListScreen
