import React from 'react';
import './ReviewProduct.css';

const ReviewProduct = ({ pd, removeProduct }) => {
    const { name, seller, price, key, quantity } = pd;
    return (
        <div className="review-product">
            <div className="product-info">
                <h3 className="name">{name}</h3>
                <p>Product Quantity : {quantity}</p>
                <p className="price">${price}</p>
                <p className="seller">
                    <small>By : {seller}</small>
                </p>

                <button className="addToCart" type="button" onClick={() => removeProduct(key)}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ReviewProduct;
