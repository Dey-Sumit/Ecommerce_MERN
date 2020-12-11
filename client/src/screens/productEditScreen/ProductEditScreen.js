import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../components/formContainer/FormContainer'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message/Message'
import Loader from '../../components/Loader'
import { getListProducts, updateProduct } from '../../redux/actions/productAction'
import axios from 'axios';

const ProductEditScreen = () => {

    const { id: productId } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(false)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate


    useEffect(() => {
        if (successUpdate) {
            console.log("success");
            //TODO reset
        }
        else {
            if (!product.name || product._id !== productId) {
                dispatch(getListProducts(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }



    }, [dispatch, product, productId, successUpdate])


    const handleSubmit = (e) => {
        e.preventDefault()
        //Update product
        dispatch(updateProduct({
            _id: productId,
            name, price, image, brand, category, description, countInStock

        }))
    }
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post(`/api/v1/upload`, formData, config)
            //returns the url
            setImage(data)
            setUploading(false)

        } catch (error) {
            console.log(error);
            setUploading(false)

        }

    }

    return (
        <>
            <Link to='/admin/productList' className="btn btn-light my-3">
                Back
            </Link>

            <FormContainer>
                <h1>Update Product Details</h1>

                {errorUpdate && <Message variant='danger' >{errorUpdate}</Message>}
                {error && <Message variant='danger' >{error}</Message>}
                {loadingUpdate && <Loader />}

                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter Name'
                            value={name} onChange={e => setName(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>price</Form.Label>
                        <Form.Control type='number' placeholder='Enter Price'
                            value={price} onChange={e => setPrice(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder='Enter image url'
                            value={image} onChange={e => setImage(e.target.value)} >
                        </Form.Control>
                        <Form.File
                            id="image-file"
                            label="Choose File"
                            custom
                            onChange={uploadFileHandler}

                        />
                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter brand'
                            value={brand} onChange={e => setBrand(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>category</Form.Label>
                        <Form.Control type='text' placeholder='Enter Category'
                            value={category} onChange={e => setCategory(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label>CountInStock</Form.Label>
                        <Form.Control type='number' placeholder='Enter CountInStock'
                            value={countInStock} onChange={e => setCountInStock(e.target.value)} >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='number' placeholder='Enter Description'
                            value={description} onChange={e => setDescription(e.target.value)} >
                        </Form.Control>
                    </Form.Group>




                    <Button type='submit' variant='primary'>Update</Button>

                </Form>
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
