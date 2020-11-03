import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Rating from '../rating/Rating';

const Product = ({ product: { _id, image, name, numReviews, price, rating } }) => {
    console.log(image);
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${_id}`}>
                <Card.Img src={image} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${_id}`}>
                    <Card.Title as='div'>
                        <strong>{name}</strong>
                    </Card.Title>

                    <Card.Text as="div">
                        <div className="my-3">
                            <Rating color="yellow" value={rating} text={`${numReviews} reviews`} />
                        </div>
                    </Card.Text>



                    <Card.Text as='div'> <h4 className="pt-2">${price}</h4></Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Product
